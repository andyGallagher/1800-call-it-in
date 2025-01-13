import { orderRouter } from "@/routes/order";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { config } from "shared/src/config";

const api = new Hono();
api.basePath("/api/v1/");

// Highest level routes
api.route("/order", orderRouter);

serve({
    fetch: api.fetch,
    port: config("SERVER_PORT", (val) => parseInt(val)),
});
