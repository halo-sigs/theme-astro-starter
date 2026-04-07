// @ts-check
import { defineConfig } from "astro/config";

import vue from "@astrojs/vue";
import Icons from "unplugin-icons/vite";

export default defineConfig({
  base: "/themes/astro-starter",
  build: {
    assets: "assets",
    format: "file",
  },
  outDir: "./templates",
  integrations: [vue()],
  vite: {
    plugins: [
      Icons({
        compiler: "vue3",
      }),
    ],
  },
});
