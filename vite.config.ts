import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

//@ts-ignore
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
    plugins: [react(), nodePolyfills()],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        return id.toString().split("node_modules/")[1].split("/")[0].toString();
                    }
                },

                // Хеширование файлов
                entryFileNames: "assets/[name].[hash].js",
                chunkFileNames: "assets/[name].[hash].js",
                assetFileNames: "assets/[name].[hash].[ext]",
            },
        },
    },

    server: {
        host: true,
        port: 5173,
        allowedHosts: ["dev.web-assist.ru"],
    },
});
