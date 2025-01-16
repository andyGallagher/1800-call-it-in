import { z } from "zod";

export const StringOrDate = z
    .string()
    .or(z.date())
    .transform((arg) => new Date(arg));
