import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    sveltekit(),
    nodePolyfills({
      // Enable polyfills for globals like Buffer and process
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      // Alias the missing module to the 'buffer' package.
      "vite-plugin-node-polyfills/shims/buffer": "buffer",
    },
  },
});
