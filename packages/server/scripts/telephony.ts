/**
 * Little script for testing telephony service.
 * This should probably be deleted once the telephony service is fully implemented
 * and we have a UI for this.
 */

import { telephony } from "@/services/telephony";
import { notImplemented } from "shared/src/function";

void (async () => {
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
        case "phoneNumber":
            const phoneNumberId = await telephony.getPhoneNumberId("Vapi");
            console.info({ phoneNumberId });
            return;
        case "call":
            return notImplemented();
        default: {
            throw new Error("Invalid command");
        }
    }
})();
