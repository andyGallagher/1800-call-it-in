import { healthRouter } from "@/routes/health";
import { orderRouter } from "@/routes/order";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { config } from "shared/src/config";

const api = new Hono();

// Highest level routes
api.basePath("/api/v1/")
    .use(
        cors({
            origin: "*", // TODO: Change this to a specific origin
            allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allowHeaders: ["Content-Type", "Authorization"],
        }),
    )
    .route("/health", healthRouter)
    .route("/order", orderRouter);

serve({
    fetch: api.fetch,
    port: config("SERVER_PORT", (val) => parseInt(val)),
});
