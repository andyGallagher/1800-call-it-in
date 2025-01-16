import { z } from "zod";

export const ParsedMenuItem = z.object({
    name: z.string(),
    quantity: z.number(),
    costPerItem: z.number().nullable(),
});

export const ParsedTranscription = z.object({
    pickupTime: z.date().nullable(),
    totalCost: z.number().nullable(),
});
