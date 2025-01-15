import { z } from "zod";

export const ParsedMenuItem = z.object({
    name: z.string(),
    quantity: z.number(),
    costPerItem: z.number().nullable(),
});
