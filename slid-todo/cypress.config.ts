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
    setupNodeEvents(on, config) {
      config.env = {
        ...config.env,
        TEST_EMAIL: process.env.TEST_EMAIL,
        TEST_PASSWORD: process.env.TEST_PASSWORD,
        TEAM_ID: process.env.TEAM_ID,
      };

      console.log("Cypress ENV:", {
        TEST_EMAIL: config.env.TEST_EMAIL,
        TEAM_ID: config.env.TEAM_ID,
      });

      return config;
    },
    experimentalStudio: true,
  },
});
