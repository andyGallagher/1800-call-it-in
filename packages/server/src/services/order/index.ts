/**
 * # TODO => Extend this service if we want calls to be more flexible.
 * For a POC, I'm honestly not gonna bother.
 * This is just gonna all be openai conformant.
 */
import { PLACE_ORDER_SYSTEM_PROMPT } from "@/services/order/prompts";
import { PlaceOrderOrderItem } from "@/services/order/types";
import { HumanMessage } from "@langchain/core/messages";
import { ChatPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";
import stringify from "json-stable-stringify";
import { StructuredOutputParser } from "langchain/output_parsers";
import { CompleteOrder, ParsedMenuItem } from "schema";
import { config } from "shared/src/config";
import { unindented } from "shared/src/format";
import { assert } from "shared/src/function";

const chatOpenAI = new ChatOpenAI({
    apiKey: config("OPEN_AI_API_KEY"),
});

export const order = {
    parse: {
        menuItems: async (rawContent: string) => {
            const chain = RunnableSequence.from([
                PromptTemplate.fromTemplate(
                    unindented`
                        I'm going to give you the innerText of an HTML document, which contains an order for food.
                        Please pick out the items of the food order.
                        Items should consist of a name, quantity, and costPerItem.
                        Return the items in a JSON array.
    
                        Rules:
                        - If there are multiple items with the same name, combine them into one item.
                        - If there is no price, set costPerItem to null.
                        - Return the costPerItem as cents.
    
                        {rawContent}
                    `,
                ),
                chatOpenAI,
            ]).pipe(
                StructuredOutputParser.fromZodSchema(ParsedMenuItem.array()),
            );

            return chain.invoke({
                rawContent,
            });
        },
    },

    create: {
        prompt: {
            firstMessage: (order: CompleteOrder) => {
                return "Hey, I'd like to make an order for pickup.";
            },

            template: (order: CompleteOrder): ChatPromptTemplate => {
                const orderItems: PlaceOrderOrderItem[] = order.menuItems.map(
                    (orderItem): PlaceOrderOrderItem => {
                        return {
                            name: orderItem.name,
                            quantity: orderItem.quantity,
                        };
                    },
                );

                const content = stringify(orderItems);
                assert(content !== undefined, "Expected content to be defined");

                return ChatPromptTemplate.fromMessages([
                    PLACE_ORDER_SYSTEM_PROMPT,
                    new HumanMessage({ content }),
                ]);
            },
        },
    },
};
