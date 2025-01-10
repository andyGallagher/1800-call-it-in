export type Telephony = {
    makeOutboundCall: (phoneNumber: string) => Promise<void>;
};
