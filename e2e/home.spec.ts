import { setupClerkTestingToken } from "@clerk/testing/playwright";
import { expect, test } from "@playwright/test";

test.describe("Home page", () => {
  test("should show home page when authenticated", async ({ page }) => {
    await setupClerkTestingToken({ page });

    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Continue to Money Flows");
    await page.waitForSelector(".cl-signIn-root", { state: "attached" });
    await page
      .locator("input[name=identifier]")
      .fill(process.env.E2E_CLERK_USER_USERNAME!);
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await page
      .locator("input[name=password]")
      .fill(process.env.E2E_CLERK_USER_PASSWORD!);
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await page.waitForURL("/");

    await expect(page.getByRole("navigation")).toBeVisible();
  });
});
