import { Page } from "@playwright/test";

import LoginPage from "./LoginPage";
import DatePickerPage from "./DatePickerPage";
import DashboardPage from "./DashboardPage";
import NavBarPage from "./NavBarPage";
import LeavePage from "./LeavePage";

class PageManager {
  private page: Page;
  private loginPage: LoginPage;
  private dashboardPage: DashboardPage;
  private navBarPage: NavBarPage;
  private leavePage: LeavePage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.dashboardPage = new DashboardPage(page);
    this.navBarPage = new NavBarPage(page);
    this.leavePage = new LeavePage(page);
  }

  onLoginPage() {
    return this.loginPage;
  }

  onDashboardPage() {
    return this.dashboardPage;
  }

  onNavBarPage() {
    return this.navBarPage;
  }

  onLeavePage() {
    return this.leavePage;
  }
}

export default PageManager;
