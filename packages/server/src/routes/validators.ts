import { validator } from "hono/validator";
import { z, ZodRawShape } from "zod";

export const makeValidator = <O extends ZodRawShape>(
    schema: z.ZodObject<O>,
) => {
    return validator("json", (value, c) => {
        const res = schema.safeParse(value);

        if (!res.success) {
            return c.json({ error: res.error.errors }, 400);
        }

        return res.data;
    });
};
