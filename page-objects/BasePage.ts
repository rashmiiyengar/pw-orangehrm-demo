import { Page, expect } from "@playwright/test";

class BasePage{

 readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

 async selectDropdownOption(
    dropdownLabel: string,
    expectedOptions: string[],
    desiredOption: string
  ) {
    if (this.page.isClosed()) {
      throw new Error("Page has been closed");
    }
    await this.page.screenshot({ path: 'screenshot.png' });
    // Locate the dropdown based on the dynamic label or text within the dropdown
    const dropdownWrapper = this.page.locator(
        `.oxd-select-wrapper:has(.oxd-select-text-input:has-text("${dropdownLabel}"))`
    );
    await dropdownWrapper.waitFor({ state: "visible", timeout: 60000 });
    await dropdownWrapper.click();
    const dropdownOptions = this.page.locator(
      ".oxd-select-dropdown .oxd-select-option"
    );
    const optionsText = await dropdownOptions.allTextContents();
    const validOptions = optionsText.filter(
      (option) => option != "-- Select --"
    );
    await expect(validOptions).toEqual(expectedOptions);

    if (desiredOption === "Specify Time") {
      await dropdownOptions
          .filter({ hasText: desiredOption })
          .first()
          .click();
       await this.specifyTimeFromandTo();
      
    } else {
      if (validOptions.includes(desiredOption)) {
        await dropdownOptions
          .filter({ hasText: desiredOption })
          .first()
          .click();
      } else {
        console.log(
          `"${desiredOption}" option is not available in dropdown ${dropdownLabel}`
        );
      }
    }
  }

  private async specifyTimeFromandTo(){
    await this.page.locator('div.oxd-input-group:has(.oxd-label:text-is("From")) input.oxd-input').click();

  }

}

export default BasePage;