import { Telephony } from "@/services/telephony/types";
import { VapiClient } from "@vapi-ai/server-sdk";
import { config } from "shared/src/config";
import { assert } from "shared/src/function";

const client = new VapiClient({ token: config("VAPI_API_PRIVATE_KEY") });

export const vapi = {
    getPhoneNumberId: async () => {
        const phoneNumbers = await client.phoneNumbers.list();
        assert(
            phoneNumbers.length === 1,
            "Expected exactly one phone number in vapi",
        );

        const phoneNumber = phoneNumbers[0];
        return phoneNumber.id;
    },

    makeOutboundCall: async (phoneNumber: string) => {
        const phoneNumberId = await vapi.getPhoneNumberId();
    },
} satisfies Telephony;
