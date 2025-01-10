import { createClient } from "@/db/client";
export { Prisma } from "schema/src";

export const db = createClient();
