import { setupClerkTestingToken } from "@clerk/testing/playwright";
import { expect, Page } from "@playwright/test";

/**
 * Common login function
 * Call this function at the beginning of tests to perform user login
 */
export async function login(page: Page): Promise<void> {
  // Set up Clerk testing token
  await setupClerkTestingToken({ page });

  // Navigate to sign-in page
  await page.goto("/sign-in");
  await expect(page.locator("h1")).toContainText("Continue to Money Flows");

  // Wait for login form to appear
  await page.waitForSelector(".cl-signIn-root", { state: "attached" });

  // Enter username and password to login
  await page
    .locator("input[name=identifier]")
    .fill(process.env.E2E_CLERK_USER_USERNAME!);
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page
    .locator("input[name=password]")
    .fill(process.env.E2E_CLERK_USER_PASSWORD!);
  await page.getByRole("button", { name: "Continue", exact: true }).click();

  // Wait for redirect to homepage
  await page.waitForURL("/");

  // Verify that navigation is visible
  await expect(page.getByRole("navigation")).toBeVisible();
}
