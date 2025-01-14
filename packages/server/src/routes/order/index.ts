import { db } from "@/db";
import { makeValidator } from "@/routes/validators";
import { order } from "@/services/order";
import { DEFAULT_TELEPHONY_PROVIDER, telephony } from "@/services/telephony";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";
import { Hono } from "hono";
import { StructuredOutputParser } from "langchain/output_parsers";
import { CompleteOrder, ParsedMenuItem, PhoneNumber } from "schema";
import { config } from "shared/src/config";
import { unindented } from "shared/src/format";
import { notImplemented } from "shared/src/function";
import { z } from "zod";

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
    makeValidator(z.object({ rawContent: z.string() })),
    async (c) => {
        const { rawContent } = c.req.valid("json");

        const chatOpenAI = new ChatOpenAI({
            apiKey: config("OPEN_AI_API_KEY"),
        });

        const chain = RunnableSequence.from([
            PromptTemplate.fromTemplate(
                unindented`
                    I'm going to give you the innerText of an HTML document, which contains an order for food.
                    Please pick out the items of the food order.
                    Items should consist of a name, quantity, and price.
                    Return the items in a JSON array.

                    Rules:
                    - If there are multiple items with the same name, combine them into one item.
                    - If there is no price, set it to null.
                    - Return the price as cents.

                    {rawContent}
                `,
            ),
            chatOpenAI,
        ]).pipe(StructuredOutputParser.fromZodSchema(ParsedMenuItem.array()));

        const response = await chain.invoke({
            rawContent,
        });

        return c.json(response);
    },
);
