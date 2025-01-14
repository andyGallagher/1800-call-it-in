import { db } from "@/db";
import { makeValidator } from "@/routes/validators";
import { order } from "@/services/order";
import { DEFAULT_TELEPHONY_PROVIDER, telephony } from "@/services/telephony";
import { createHash } from "crypto";
import { Hono } from "hono";
import { CompleteOrder, PhoneNumber } from "schema";
import { unindented } from "shared/src/format";
import { notImplemented } from "shared/src/function";
import { z } from "zod";

const hash = (str: string): string => {
    return createHash("md5").update(str).digest("hex");
};

export const orderRouter = new Hono();

orderRouter.get("/:id", (c) => {
    return notImplemented();
});

orderRouter
    .post("/", makeValidator(CompleteOrder.omit({ id: true })), async (c) => {
        const rawOrder = c.req.valid("json");

        if (!rawOrder.menuItems.length) {
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
                ...rawOrder,

                menuItems: {
                    create: rawOrder.menuItems,
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

        await db.order.update({
            data: {
                telephoneCall: {
                    create: {
                        externalServiceId: call.telephoneCallExternalServiceId,
                        externalServiceType:
                            call.telephoneCallExternalServiceType,
                    },
                },
            },
            where: {
                id: dbOrder.id,
            },
        });

        return c.text("POST /endpoint");
    })
    .put((c) => {
        return notImplemented();
    })
    .delete((c) => {
        return notImplemented();
    });

orderRouter.post(
    "/parse",
    makeValidator(
        z.object({ rawContent: z.string(), refresh: z.boolean().optional() }),
    ),
    async (c) => {
        const { rawContent, refresh } = c.req.valid("json");

        const cached = await db.rawOrder.findFirst({
            where: {
                inputHash: hash(rawContent),
            },
        });

        // This is not very typesafe, but it's fine for now.
        if (refresh !== true && cached) {
            return c.json(cached.outputData);
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
    },
);
