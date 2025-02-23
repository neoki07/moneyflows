import { setupClerkTestingToken } from "@clerk/testing/playwright";
import { expect, test } from "@playwright/test";

test("all pages should be accessible", async ({ page }) => {
  // セットアップとログインフロー
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

  // ナビゲーションが表示されていることを確認
  await expect(page.getByRole("navigation")).toBeVisible();
  await expect(page.getByRole("heading", { name: "ホーム" })).toBeVisible();

  // タグページに遷移してempty stateが表示されること
  await page.getByRole("link", { name: "タグ" }).click();
  await expect(page.getByRole("heading", { name: "タグ" })).toBeVisible();
  await expect(page.getByText("タグがありません")).toBeVisible();

  // タグを追加
  await page.getByRole("button", { name: "タグを追加" }).click();
  await expect(page.getByRole("heading", { name: "タグの追加" })).toBeVisible();
  await page.getByRole("textbox", { name: "名前" }).fill("食費");
  await page.getByRole("button", { name: "保存" }).click();
  await expect(page.getByText("食費")).toBeVisible();

  // タグを編集
  await page.getByRole("button", { name: "編集" }).click();
  await expect(page.getByRole("heading", { name: "タグの編集" })).toBeVisible();
  await page.getByRole("textbox", { name: "名前" }).fill("食費（編集済み）");
  await page.getByRole("button", { name: "更新" }).click();
  await expect(page.getByText("食費（編集済み）")).toBeVisible();

  // タグを削除
  await page.getByRole("button", { name: "削除" }).click();
  await expect(page.getByRole("heading", { name: "タグを削除" })).toBeVisible();
  await page.getByRole("button", { name: "削除" }).click();
  await expect(page.getByText("タグがありません")).toBeVisible();
});
