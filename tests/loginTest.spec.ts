import { expect } from "@playwright/test";
import { test } from "../fixtures/Testoptions";

test("Verify that you are successfully able to login", async ({
  pageManager,
}) => {
  await pageManager.onLoginPage().navigateTo();

  await pageManager.onLoginPage().login("Admin", "admin123");
});

test("Verify that you not ble to login with invalid", async ({
  pageManager,
}) => {
  await pageManager.onLoginPage().navigateTo();
  await pageManager.onLoginPage().login("Admine", "admin123e");
  const errMsg = await pageManager.onLoginPage().getErrorMessage();
  await expect(errMsg).toContain("Invalid credentials");
});
