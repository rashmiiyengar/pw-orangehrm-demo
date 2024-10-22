import { Page } from "@playwright/test";

import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import NavBarPage from "./NavBarPage";
import LeavePage from "./LeavePage";
import MyLeavePage from "./MyLeavePage";
import BasePage from "./BasePage";

class PageManager {
  private page: Page;
  private loginPage: LoginPage;
  private dashboardPage: DashboardPage;
  private navBarPage: NavBarPage;
  private leavePage: LeavePage;
  private myLeavePage:MyLeavePage;
  private basePage:BasePage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.dashboardPage = new DashboardPage(page);
    this.navBarPage = new NavBarPage(page);
    this.leavePage = new LeavePage(page);
    this.basePage = new BasePage(page);
    this.myLeavePage= new MyLeavePage(page);
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

  onMyLeavePage() {
    return this.myLeavePage;
  }

  onBasePage() {
    return this.basePage;
  }
}

export default PageManager;
