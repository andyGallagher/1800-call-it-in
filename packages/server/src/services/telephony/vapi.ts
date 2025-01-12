import { Telephony } from "@/services/telephony/types";
import { VapiClient } from "@vapi-ai/server-sdk";
import { config } from "shared/src/config";
import { assert } from "shared/src/function";

const client = new VapiClient({ token: config("VAPI_API_PRIVATE_KEY") });

export const vapi = {
    phone: {
        getPhoneNumberId: async () => {
            const phoneNumbers = await client.phoneNumbers.list();
            assert(
                phoneNumbers.length === 1,
                "Expected exactly one phone number in vapi",
            );

            const phoneNumber = phoneNumbers[0];
            return phoneNumber.id;
        },

        makeOrder: async (rawPhoneNumber: string) => {
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

            const phoneNumberId = await vapi.phone.getPhoneNumberId();
            await client.calls.create({
                phoneNumberId,
                assistant: {
                    maxDurationSeconds: 120,
                    backgroundSound: "office",
                    transcriber: {
                        provider: "deepgram",
                        codeSwitchingEnabled: true,
                    },
                    firstMessage: "Hey, I'd like to make an order for pickup.",
                    model: {
                        provider: "openai",
                        model: "gpt-3.5-turbo",
                        messages: [
                            {
                                role: "system",
                                content: "",
                            },
                        ],
                    },
                },
                customer: {
                    number: phoneNumber,
                },
            });
        },
    },
} satisfies Telephony;
