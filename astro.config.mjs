import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), tailwind()],
  outDir: "./templates",
  output: "static",
  build: {
    format: "file",
  },
  server: {
    port: 4000,
  },
});
