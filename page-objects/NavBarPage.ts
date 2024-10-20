import { Page, Locator } from "@playwright/test";

class NavBarPage {
  private readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async navigateToLeaveApplyPage() {
    await this.page.goto("/leave/applyLeave");
  }

  async isleaveTitleVisible(){
    const pageTitle= await this.page.locator('.oxd-topbar-header-breadcrumb h6').textContent();
    return pageTitle;
}

}

export default NavBarPage;
