import { Page, Locator } from "@playwright/test";

class LoginPage {
  private readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  private errorMessage(): Locator {
    return this.page.locator('.oxd-alert.oxd-alert--error');
  }

  async navigateTo() {
    await this.page.goto("/");
  }

  async login(userName: string, password: string) {
    await this.page.getByRole("textbox", { name: "Username" }).fill(userName);
    await this.page.getByRole("textbox", { name: "Password" }).fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
  }

  async getErrorMessage(): Promise<string|null> {
    await this.errorMessage().waitFor({state:'visible'})
    return await this.errorMessage().textContent();
  }
}

export default LoginPage;
