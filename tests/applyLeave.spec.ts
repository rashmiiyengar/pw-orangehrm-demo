import { expect } from "@playwright/test";
import { test } from "../fixtures/Testoptions";



test("Verify that you are successfully able to login to dashboard", async ({
  pageManager,
}) => {
  await pageManager.onDashboardPage().navigateTo();
  const welcomeText = await pageManager.onDashboardPage().isDashboardVisible();
  await expect(welcomeText).toEqual("Dashboard");
});

