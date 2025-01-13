/**
 * Little script for testing telephony service.
 * This should probably be deleted once the telephony service is fully implemented
 * and we have a UI for this.
 */

import { order } from "@/services/order";
import { telephony } from "@/services/telephony";
import { CompleteOrder } from "schema";

/**
 * Test out a phonecall
 */
void (async () => {
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
        case "call":
            const stubOrder: CompleteOrder = {
                createdAt: new Date(),
                updatedAt: new Date(),
                id: "xxx",
                restaurantName: "McDonalds",
                restaurantPhoneNumber: "+1234567890",
                pickupTime: null,
                totalCost: null,
                menuItems: [
                    {
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        id: "fff",
                        name: "Big Mac",
                        quantity: 1,
                        orderId: "xxx",
                        costPerItem: 5.99,
                    },
                ],
            };

            const firstMessage = order.create.prompt.firstMessage(stubOrder);
            const template = order.create.prompt.template(stubOrder);

            const call = await telephony.call(
                "Vapi",
                "+1234567890",
                firstMessage,
                template,
            );
            console.info({ call });
            return;

        default: {
            throw new Error("Invalid command");
        }
    }
})();
