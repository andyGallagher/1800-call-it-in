export type Telephony = {
    getPhoneNumberId: () => Promise<string>;
    makeOutboundCall: (phoneNumber: string) => Promise<void>;
};
