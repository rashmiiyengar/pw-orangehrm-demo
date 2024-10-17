import { Page } from "@playwright/test";

import LoginPage from "./LoginPage";
import DatePickerPage from "./DatePickerPage";
import DashboardPage from "./DashboardPage";

class PageManager {
  private page: Page;
  private loginPage: LoginPage;
  private datePickerPage: DatePickerPage;
  private dashboardPage: DashboardPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.datePickerPage = new DatePickerPage(page);
    this.dashboardPage = new DashboardPage(page)
  }

  onLoginPage() {
    return this.loginPage;
  }

  onDatePickerPage(){
    return this.datePickerPage;
  }

  onDashboardPage(){
    return this.dashboardPage;
  }
}

export default PageManager;
