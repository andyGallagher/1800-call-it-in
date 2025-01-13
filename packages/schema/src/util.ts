import { z } from "zod";

export const PhoneNumber = z.string().refine(
    (value) => {
        const e164Regex = /^\+[1-9]\d{1,14}$/;
        return e164Regex.test(value);
    },
    {
        message: "Invalid E164 phone number format",
    },
);
