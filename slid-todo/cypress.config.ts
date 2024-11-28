import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    // supportFile: "cypress/support/index.d.ts",
    setupNodeEvents(on, config) {},
  },
});
