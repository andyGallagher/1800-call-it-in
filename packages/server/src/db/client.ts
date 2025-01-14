// eslint-disable-next-line no-restricted-imports
import { DB } from "schema";

const prismaClientExtension = DB.Prisma.defineExtension({});

export const createClient = (debug: boolean = false) => {
    const unextendedClient =
        (globalThis as any).prismaGlobal ??
        new DB.PrismaClient({
            log: debug
                ? ["query", "info", "warn", "error"]
                : ["info", "warn", "error"],
        });

    if (debug) {
        // This `as never` type is ridiculous but the Prisma types are wrong so it's required.
        unextendedClient.$on("query" as never, (e: any) => {
            console.info("prisma: params" + e.params);
        });
    }

    const client = unextendedClient.$extends(prismaClientExtension);

    // lol... such shit
    // https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
    if (process.env.NODE_ENV !== "production") {
        (globalThis as any).prismaGlobal = client;
    }

    return client as DB.PrismaClient;
};
