import { expect, test } from "@playwright/test";

import { login } from "../auth/login";

test.describe("Tags page", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("should manage tags (create, edit, delete)", async ({ page }) => {
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
});
