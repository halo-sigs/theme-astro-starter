// @ts-check
import { defineConfig } from "astro/config";

import vue from "@astrojs/vue";

export default defineConfig({
  base: "/themes/astro-starter",
  build: {
    assets: "assets",
    format: "file",
  },
  outDir: "./templates",
  integrations: [vue()],
});
