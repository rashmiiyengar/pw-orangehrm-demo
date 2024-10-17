import { Page, Locator, expect } from "@playwright/test";

class DashboardPage{

    private readonly page:Page;

    constructor(page: Page) {
        this.page = page;
      }

    async navigateTo(){
        await this.page.goto("/web/index.php/dashboard/index");
    };

    async isDashboardVisible(){
        const welcomeText= await this.page.locator('.oxd-topbar-header-breadcrumb h6').textContent();

        return welcomeText;
    }

   
}

export default DashboardPage;