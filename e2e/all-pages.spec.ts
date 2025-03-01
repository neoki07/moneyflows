import { setupClerkTestingToken } from "@clerk/testing/playwright";
import { expect, test } from "@playwright/test";

test.describe("All pages", () => {
  test.beforeEach(async ({ page }) => {
    // Setup and login flow
    await setupClerkTestingToken({ page });
    await page.goto("/sign-in");
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

    // Check if navigation is visible
    await expect(page.getByRole("navigation")).toBeVisible();
    await expect(page.getByRole("heading", { name: "ホーム" })).toBeVisible();
  });

  test("tags page", async ({ page }) => {
    // Navigate to tags page and check empty state
    await page.getByRole("link", { name: "タグ" }).click();
    await expect(page.getByRole("heading", { name: "タグ" })).toBeVisible();
    await expect(page.getByText("タグがありません")).toBeVisible();

    // Add a tag
    await page.getByRole("button", { name: "タグを追加" }).click();
    await expect(
      page.getByRole("heading", { name: "タグの追加" }),
    ).toBeVisible();
    await page.getByRole("textbox", { name: "名前" }).fill("食費");
    await page.getByRole("button", { name: "保存" }).click();
    await expect(page.getByText("食費")).toBeVisible();

    // Edit the tag
    await page.getByRole("button", { name: "編集" }).click();
    await expect(
      page.getByRole("heading", { name: "タグの編集" }),
    ).toBeVisible();
    await page.getByRole("textbox", { name: "名前" }).fill("食費（編集済み）");
    await page.getByRole("button", { name: "更新" }).click();
    await expect(page.getByText("食費（編集済み）")).toBeVisible();

    // Delete the tag
    await page.getByRole("button", { name: "削除" }).click();
    await expect(
      page.getByRole("heading", { name: "タグを削除" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "削除" }).click();
    await expect(page.getByText("タグがありません")).toBeVisible();
  });

  test("categories page", async ({ page }) => {
    // Navigate to categories page and check empty states for both income and expense
    await page.getByRole("link", { name: "カテゴリー" }).click();
    await expect(
      page.getByRole("heading", { name: "カテゴリー" }),
    ).toBeVisible();
    await expect(page.getByText("収入カテゴリーがありません")).toBeVisible();
    await expect(page.getByText("支出カテゴリーがありません")).toBeVisible();

    // Add an income category
    await page.getByRole("button", { name: "収入カテゴリーを追加" }).click();
    await expect(
      page.getByRole("heading", { name: "収入カテゴリーの追加" }),
    ).toBeVisible();
    await page.getByRole("textbox", { name: "名前" }).fill("給与");
    await page.getByRole("button", { name: "保存" }).click();
    await expect(page.getByText("給与")).toBeVisible();

    // Edit the income category
    await page.getByRole("button", { name: "編集" }).click();
    await expect(
      page.getByRole("heading", { name: "カテゴリーの編集" }),
    ).toBeVisible();
    await page.getByRole("textbox", { name: "名前" }).fill("給与（編集済み）");
    await page.getByRole("button", { name: "保存" }).click();
    await expect(page.getByText("給与（編集済み）")).toBeVisible();

    // Delete the income category
    await page.getByRole("button", { name: "削除" }).click();
    await expect(
      page.getByRole("heading", { name: "カテゴリーの削除" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "削除" }).click();
    await expect(page.getByText("収入カテゴリーがありません")).toBeVisible();

    // Add an expense category
    await page.getByRole("button", { name: "支出カテゴリーを追加" }).click();
    await expect(
      page.getByRole("heading", { name: "支出カテゴリーの追加" }),
    ).toBeVisible();
    await page.getByRole("textbox", { name: "名前" }).fill("食費");
    await page.getByRole("button", { name: "保存" }).click();
    await expect(page.getByText("食費")).toBeVisible();

    // Edit the expense category
    await page.getByRole("button", { name: "編集" }).click();
    await expect(
      page.getByRole("heading", { name: "カテゴリーの編集" }),
    ).toBeVisible();
    await page.getByRole("textbox", { name: "名前" }).fill("食費（編集済み）");
    await page.getByRole("button", { name: "保存" }).click();
    await expect(page.getByText("食費（編集済み）")).toBeVisible();

    // Delete the expense category
    await page.getByRole("button", { name: "削除" }).click();
    await expect(
      page.getByRole("heading", { name: "カテゴリーの削除" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "削除" }).click();
    await expect(page.getByText("支出カテゴリーがありません")).toBeVisible();
  });
});
