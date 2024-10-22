import { expect } from "@playwright/test";
import { test } from "../fixtures/Testoptions";


test.beforeEach(async ({ pageManager }) => {
  await pageManager.onDashboardPage().navigateTo();
});

test.describe("Leave",()=>{

  test("Verify that you are able to apply leave ", async ({ pageManager }) => {
    await pageManager.onDashboardPage().navigateTo();
    const welcomeText = await pageManager.onDashboardPage().isDashboardTitleVisible();
    await expect(welcomeText).toEqual("Dashboard");
  
    await pageManager.onDashboardPage().clickonApplyLeaveOnDashboard();
    expect( await pageManager.onDashboardPage().isDashboardTitleVisible()).toEqual('Leave');
    await pageManager.onLeavePage().submitLeaveRequest();
    
  });

  test.only('Verify applied leave in My Leaves page (dependent)', async ({ pageManager }) => {
    await pageManager.onDashboardPage().clickOnMyLeaveOnDashboard();
    await pageManager.onMyLeavePage().searchLeaveTypeAndValidate();
  });

})




