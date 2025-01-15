// # TODO => Generate hono router hooks if we make more than like... 7 of these.

import { z } from "zod";
import { PhoneNumber } from "./util";

export const CreateOrderInput = z.object({
    menuItems: z.array(
        z.object({
            name: z.string(),
            quantity: z.number(),
            price: z.number().nullable(),
        }),
    ),
    userName: z.string(),
    userPhoneNumber: PhoneNumber,
    restaurantName: z.string(),
    restaurantPhoneNumber: PhoneNumber,
});

export const ParseOrderInput = z.object({
    rawContent: z.string(),
    refresh: z.boolean().optional(),
});
