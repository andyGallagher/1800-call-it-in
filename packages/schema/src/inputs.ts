// # TODO => Generate hono router hooks if we make more than like... 7 of these.

import { z } from "zod";
import { ParsedMenuItem } from "./parser";
import { PhoneNumber } from "./util";

export const CreateOrderInput = z.object({
    parsedMenuItems: ParsedMenuItem.array(),

    userName: z.string(),
    userPhoneNumber: PhoneNumber,
    restaurantName: z.string().optional(),
    restaurantPhoneNumber: PhoneNumber,
});

export const ParseOrderInput = z.object({
    rawContent: z.string(),
    refresh: z.boolean().optional(),
});
