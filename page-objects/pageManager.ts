import { Page } from "@playwright/test";

import LoginPage from "./LoginPage";

class PageManager {
  private page: Page;
  private loginPage: LoginPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
  }

  onLoginPage() {
    return this.loginPage;
  }
}

export default PageManager;
