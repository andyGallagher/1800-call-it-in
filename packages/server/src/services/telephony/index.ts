import { vapi } from "@/services/telephony/vapi";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { DB } from "schema";
import { config } from "shared/src/config";
import { unreachableCaseError } from "shared/src/error";

export const DEFAULT_TELEPHONY_PROVIDER = config(
    "DEFAULT_TELEPHONY_PROVIDER",
    (val): DB.TelephonyServiceType => {
        if (
            !Object.values(DB.TelephonyServiceType).includes(
                val as DB.TelephonyServiceType,
            )
        ) {
            throw new Error("Invalid telephony provider");
        }

        return val as DB.TelephonyServiceType;
    },
);

const providerFor = (externalServiceType: DB.TelephonyServiceType) => {
    switch (externalServiceType) {
        case "Vapi":
            return vapi;
        default:
            throw unreachableCaseError(externalServiceType);
    }
};

export const telephony = {
    call: async (
        externalServiceType: DB.TelephonyServiceType,
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
            config("NODE_ENV") !== "production"
                ? config("VAPI_STUB_PHONE_NUMBER")
                : rawPhoneNumber;

        const { telephoneCallExternalServiceId } = await provider.phone.call(
            phoneNumber,
            firstMessage,
            systemPrompt,
        );

        return {
            telephoneCallExternalServiceId,
            telephoneCallExternalServiceType: externalServiceType,
        };
    },
};
