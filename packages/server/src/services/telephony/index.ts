import { vapi } from "@/services/telephony/vapi";
import { TelephonyServiceType } from "schema";
import { unreachableCaseError } from "shared/src/error";
import { notImplemented } from "shared/src/function";

const providerFor = (externalServiceType: TelephonyServiceType) => {
    switch (externalServiceType) {
        case "Vapi":
            return vapi;
        default:
            throw unreachableCaseError(externalServiceType);
    }
};

export const telephony = {
    getPhoneNumberId: (externalServiceType: TelephonyServiceType) => {
        const provider = providerFor(externalServiceType);
        return provider.phone.getPhoneNumberId();
    },
    makeOrder: notImplemented,
};
