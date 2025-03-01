import { expect, test } from "@playwright/test";

import { login } from "../auth/login";

test.describe("Categories page", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("should manage categories (create, edit, delete)", async ({ page }) => {
    // Navigate to categories page and check empty state
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
