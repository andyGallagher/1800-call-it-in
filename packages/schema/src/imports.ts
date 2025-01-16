import { z } from "zod";

export const StringOrDate = z.coerce.date();
