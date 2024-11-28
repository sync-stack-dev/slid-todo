import { defineConfig } from "cypress";
import { resolve } from "path";

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
      webpackConfig: {
        resolve: {
          alias: {
            "@": resolve(__dirname, "src"),
          },
        },
      },
    },
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    // supportFile: "cypress/support/index.d.ts",
    setupNodeEvents(on, config) {},
    experimentalStudio: true,
  },
});
