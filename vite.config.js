import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [
    sveltekit(),
    nodePolyfills({
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: isProd
      ? {
          // Only apply this alias in production.
          "vite-plugin-node-polyfills/shims/buffer": "buffer",
        }
      : {},
  },
  define: {
    global: "globalThis",
  },
});
