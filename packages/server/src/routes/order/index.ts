import { db } from "@/db";
import { makeValidator } from "@/routes/validators";
import { order } from "@/services/order";
import { DEFAULT_TELEPHONY_PROVIDER, telephony } from "@/services/telephony";
import { createHash } from "crypto";
import { Hono } from "hono";
import {
    CreateOrderInput,
    ParsedMenuItem,
    ParseOrderInput,
    PhoneNumber,
} from "schema";
import { unindented } from "shared/src/format";

const hash = (str: string): string => {
    return createHash("md5").update(str).digest("hex");
};

export const orderRouter = new Hono();

orderRouter.get("/:id", async (c) => {
    const id = c.req.param("id");

    try {
        const dbOrder = await db.order.findFirstOrThrow({
            where: {
                id: id,
            },
            include: {
                menuItems: true,
                telephoneCall: true,
            },
        });

        if (
            !dbOrder.telephoneCall ||
            dbOrder.telephoneCall.transcription !== null
        ) {
            return c.json(dbOrder);
        }

        const transcriptionOutput = await telephony.transcription(
            dbOrder.telephoneCall.externalServiceType,
            dbOrder.telephoneCall.externalServiceId,
        );

        if (transcriptionOutput === undefined) {
            return c.json(dbOrder);
        }

        await db.telephoneCall.update({
            data: {
                transcription: transcriptionOutput.transcription,
            },
            where: {
                id: dbOrder.telephoneCall.id,
            },
        });

        const parsedTranscription = await order.parse.callTranscription(
            transcriptionOutput.transcription,
        );

        const updatedDbOrder = await db.order.update({
            data: {
                pickupTime: parsedTranscription.pickupTime,
                totalCost: parsedTranscription.totalCost,
            },
            where: {
                id: id,
            },
            include: {
                menuItems: true,
                telephoneCall: true,
            },
        });

        return c.json(updatedDbOrder);
    } catch (error) {
        return c.json({ error: "Order not found" }, 404);
    }
});

orderRouter.post("/", makeValidator(CreateOrderInput), async (c) => {
    const rawOrder = c.req.valid("json");

    if (!rawOrder.parsedMenuItems.length) {
        return c.json({ error: [{ message: "No menu items" }] }, 400);
    }

    const isOutBoundPhoneNumberValid = PhoneNumber.safeParse(
        rawOrder.restaurantPhoneNumber,
    ).success;

    if (!isOutBoundPhoneNumberValid) {
        throw new Error(
            unindented`
                    vapi.phone.call: Invalid phone number: ${rawOrder.restaurantPhoneNumber}.
                    Hot tip: you probably are missing US country code or leading plus sign (+1).
                `,
        );
    }

    const dbOrder = await db.order.create({
        data: {
            userName: rawOrder.userName,
            userPhoneNumber: rawOrder.userPhoneNumber,
            restaurantName: rawOrder.restaurantName,
            restaurantPhoneNumber: rawOrder.restaurantPhoneNumber,

            menuItems: {
                create: rawOrder.parsedMenuItems.map((parsedMenuItem) => ({
                    name: parsedMenuItem.name,
                    quantity: parsedMenuItem.quantity,
                    costPerItem: parsedMenuItem.costPerItem,
                })),
            },
        },
        include: {
            menuItems: true,
        },
    });

    const firstMessage = order.create.prompt.firstMessage(dbOrder);
    const template = order.create.prompt.template(dbOrder);

    const call = await telephony.call(
        DEFAULT_TELEPHONY_PROVIDER,
        dbOrder.restaurantPhoneNumber,
        firstMessage,
        template,
    );

    const updatedOrder = await db.order.update({
        data: {
            telephoneCall: {
                create: {
                    externalServiceId: call.telephoneCallExternalServiceId,
                    externalServiceType: call.telephoneCallExternalServiceType,
                },
            },
        },
        where: {
            id: dbOrder.id,
        },
    });

    return c.json(updatedOrder);
});

orderRouter.post("/parse", makeValidator(ParseOrderInput), async (c) => {
    const { rawContent, refresh } = c.req.valid("json");

    const cached = await db.rawOrder.findFirst({
        where: {
            inputHash: hash(rawContent),
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    // This is not very typesafe, but it's fine for now.
    if (cached && Array.isArray(cached.outputData)) {
        const parsedMenuItems = ParsedMenuItem.array().safeParse(
            cached.outputData,
        );

        if (parsedMenuItems.success && !refresh) {
            return c.json(cached.outputData);
        }
    }

    const menuItems = await order.parse.menuItems(rawContent);

    await db.rawOrder.create({
        data: {
            inputHash: hash(rawContent),
            inputData: rawContent,
            outputData: menuItems,
        },
    });

    return c.json(menuItems);
});
