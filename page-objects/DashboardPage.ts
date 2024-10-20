import { Page, Locator, expect } from "@playwright/test";

class DashboardPage{

    private readonly page:Page;

    constructor(page: Page) {
        this.page = page;
      }

    async navigateTo(){
        await this.page.goto("/web/index.php/dashboard/index");
    };

    async clickonApplyLeaveOnDashboard(){
        await this.page.getByRole('button',{name:'Apply Leave'}).click();
    }

    async isDashboardTitleVisible(){
        const pageTitle= await this.page.locator('.oxd-topbar-header-breadcrumb h6').textContent();
        return pageTitle;
    }

   
}

export default DashboardPage;