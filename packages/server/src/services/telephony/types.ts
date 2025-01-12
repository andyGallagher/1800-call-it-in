export type Telephony = {
    phone: {
        getPhoneNumberId: () => Promise<string>;
        makeOrder: (phoneNumber: string) => Promise<void>;
    };
};
