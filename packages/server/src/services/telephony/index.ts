import { vapi } from "@/services/telephony/vapi";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { TelephonyServiceType } from "schema";
import { config } from "shared/src/config";
import { unreachableCaseError } from "shared/src/error";

const providerFor = (externalServiceType: TelephonyServiceType) => {
    switch (externalServiceType) {
        case "Vapi":
            return vapi;
        default:
            throw unreachableCaseError(externalServiceType);
    }
};

export const telephony = {
    call: async (
        externalServiceType: TelephonyServiceType,
        rawPhoneNumber: string,
        firstMessage: string,
        systemPrompt: ChatPromptTemplate,
    ) => {
        const provider = providerFor(externalServiceType);

        /**
         *
         * 🚨 🚨 🚨
         *
         * In local development, we use a stub phone number to avoid
         * actually calling a real phone number.
         *
         * 🚨 🚨 🚨
         *
         */
        const phoneNumber =
            config("NODE_ENV") === "local"
                ? config("VAPI_STUB_PHONE_NUMBER")
                : rawPhoneNumber;

        return provider.phone.call(phoneNumber, firstMessage, systemPrompt);
    },
};
