/**
 * # TODO => Extend this service if we want calls to be more flexible.
 * For a POC, I'm honestly not gonna bother.
 * This is just gonna all be openai conformant.
 */
import { PLACE_ORDER_SYSTEM_PROMPT } from "@/services/order/prompts";
import { PlaceOrderOrderItem } from "@/services/order/types";
import { HumanMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import stringify from "json-stable-stringify";
import { CompleteOrder } from "schema";
import { assert } from "shared/src/function";

export const order = {
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
