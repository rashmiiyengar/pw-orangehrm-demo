import { expect } from "@playwright/test";
import { test } from "../fixtures/Testoptions";


test.beforeEach(async ({ pageManager }) => {
  await pageManager.onDashboardPage().navigateTo();
});

test("Verify that you are successfully able to login to dashboard", async ({
  pageManager,
}) => {
  await pageManager.onDashboardPage().navigateTo();
  const welcomeText = await pageManager.onDashboardPage().isDashboardTitleVisible();
  await expect(welcomeText).toEqual("Dashboard");
});

test.only("Verify that you are able to apply leave ", async ({ pageManager }) => {
  await pageManager.onDashboardPage().navigateTo();
  const welcomeText = await pageManager.onDashboardPage().isDashboardTitleVisible();
  await expect(welcomeText).toEqual("Dashboard");

  await pageManager.onDashboardPage().clickonApplyLeaveOnDashboard();
  expect( await pageManager.onDashboardPage().isDashboardTitleVisible()).toEqual('Leave');
  await pageManager.onLeavePage().submitLeaveRequest();
  
});
