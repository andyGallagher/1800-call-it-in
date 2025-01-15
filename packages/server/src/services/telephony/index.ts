import { vapi } from "@/services/telephony/vapi";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { config } from "shared/src/config";
import { notImplemented } from "shared/src/function";

export const DEFAULT_TELEPHONY_PROVIDER = config("DEFAULT_TELEPHONY_PROVIDER");

const providerFor = (externalServiceType: string) => {
    switch (externalServiceType) {
        case "Vapi":
            return vapi;
        default:
            throw notImplemented();
    }
};

export const telephony = {
    call: async (
        externalServiceType: string,
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

    transcription: async (
        externalServiceType: string,
        telephoneCallExternalServiceId: string,
    ) => {
        const provider = providerFor(externalServiceType);
        return provider.transcription.getTranscription(
            telephoneCallExternalServiceId,
        );
    },
};
