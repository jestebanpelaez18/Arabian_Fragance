import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  timeout: 30_000,
  retries: process.env.CI ? 2 : 0,
  reporter: [["html", { outputFolder: "playwright-report" }], ["list"]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  webServer: {
    command: process.env.CI ? "npm run start" : "npm run dev",
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "Desktop Chrome", use: { ...devices["Desktop Chrome"] } },
    { name: "Desktop Firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "Mobile Safari", use: { ...devices["iPhone 12"] } },
    { name: "Mobile Chrome", use: { ...devices["Pixel 5"] } },
  ],
});
