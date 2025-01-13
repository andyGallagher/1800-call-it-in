import { ChatPromptTemplate } from "@langchain/core/prompts";

export type TelephonyTranscriptMessage = {
    role: string;
    message: string;
};

export type Telephony = {
    transcription: {
        getTranscription: (telephoneCallExternalServiceId: string) => Promise<
            | {
                  transcription: string;
                  messages: TelephonyTranscriptMessage[];
              }
            | undefined
        >;
    };

    phone: {
        getPhoneNumberId: () => Promise<string>;
        call: (
            phoneNumber: string,
            firstMessage: string,
            systemPrompt: ChatPromptTemplate,
        ) => Promise<{ telephoneCallExternalServiceId: string }>;
    };
};
