import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
// @see https://github.com/vitejs/vite/issues/5370
// Feels pretty minor just to ignore this and move on with my life.
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { config } from "../shared/src/config";

export default defineConfig({
    server: {
        port: config("CLIENT_DEV_SERVER_PORT", (val) => parseInt(val)),
    },
    plugins: [
        react(),
        viteStaticCopy({
            targets: [
                {
                    src: "public/manifest.json",
                    dest: ".",
                },
            ],
        }),
    ],
    css: {
        modules: {
            localsConvention: "camelCase",
        },
    },
    build: {
        outDir: "build",
        rollupOptions: {
            input: {
                main: "./index.html",
            },
        },
    },
    resolve: {
        alias: {
            "@": "/src",
        },
    },
});
