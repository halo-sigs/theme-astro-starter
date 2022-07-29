import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";
import fs from "fs";
import { load } from "cheerio";

function thymeleafAssetsProcessor() {
  return {
    name: "thymeleaf-assets-processor",
    hooks: {
      "astro:build:done": async ({ dir, routes, pages }) => {
        const pageRoutes = routes.filter((route) => route.type === "page");

        for (let i = 0; i < pageRoutes.length; i++) {
          const route = pageRoutes[i];

          const pathname = route.distURL?.pathname;

          const inputHTML = await fs.promises.readFile(pathname, {
            encoding: "utf-8",
          });

          const $ = load(inputHTML);

          $("link").each((_, el) => {
            const href = $(el).attr("href");

            if (href.startsWith("/assets")) {
              $(el).attr("th:href", `@{${href}}`);
            }
          });

          $("astro-island").each((_, el) => {
            const componentUrl = $(el).attr("component-url");
            const rendererUrl = $(el).attr("renderer-url");

            if (componentUrl && componentUrl.startsWith("/assets")) {
              $(el).attr("th:component-url", `@{${componentUrl}}`);
            }

            if (rendererUrl && rendererUrl.startsWith("/assets")) {
              $(el).attr("th:renderer-url", `@{${rendererUrl}}`);
            }
          });

          await fs.promises.writeFile(pathname, $.html());
        }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), tailwind(), thymeleafAssetsProcessor()],
  outDir: "./templates",
  build: {
    format: "file",
  },
  server: {
    port: 4000,
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          entryFileNames: "assets/[name].[hash].js",
          chunkFileNames: "assets/chunks/[name].[hash].js",
          assetFileNames: "assets/[name].[hash][extname]",
        },
      },
    },
  },
});
