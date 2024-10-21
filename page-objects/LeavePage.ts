import { Page, Locator, expect } from "@playwright/test";

class LeavePage {
  private readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async submitLeaveRequest() {
    //await this.page.locator("form i").first().waitFor({ state: "visible" });
    await this.page.locator("form i").first().click();

    await this.page.getByRole("option", { name: "CAN - FMLA" }).click();

    await this.selectStartDate(0);
    await this.selectEndDate(4);

    await this.selectPartialDay();
    await this.selectedAllDayChild();
  }

  //Method to select start date
  private async selectStartDate(startDate: number) {
    const calenderInputFrom = this.page.locator(
      'div.oxd-input-group:has(label:has-text("From Date")) input'
    );

    if (!this.page.isClosed()) {
      await calenderInputFrom.click();
    } else {
      throw new Error("Page has been closed");
    }
    await this.page
      .locator(".oxd-calendar-wrapper")
      .first()
      .waitFor({ state: "visible" });
    let dateToAssert = await this.selectDateInCalender(startDate);
    //await expect(fromDate).toHaveValue(dateToAssert);
  }

  //Method to select end date
  private async selectEndDate(endDate: number) {
    const calenderInputTo = this.page.locator(
      'div.oxd-input-group:has(label:has-text("To Date")) input'
    );
    if (!this.page.isClosed()) {
      await calenderInputTo.click();
    } else {
      throw new Error("Page has been closed");
    }

    await this.page
      .locator(".oxd-calendar-wrapper")
      .first()
      .waitFor({ state: "visible" });
    const dateToAssert = await this.selectDateInCalender(endDate);
    //await expect(ToDate).toHaveValue(dateToAssert);
  }

  // Method to select a date based on an offset from today
  private async selectDateInCalender(numberOfdaysFromToday: number) {
    let date = new Date();
    date.setDate(date.getDate() + numberOfdaysFromToday);

    const expectedDate = date.getDate().toString();
    const expectedMonthShort = date.toLocaleDateString("En-US", {
      month: "short",
    });
    const expectedMonthLong = date.toLocaleDateString("En-US", {
      month: "long",
    });
    const expectedYear = date.getFullYear();

    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

    let calenderMonth = await this.page
      .locator("li")
      .filter({ hasText: "October" })
      .first()
      .textContent();
    let calenderYear = await this.page
      .locator("li")
      .filter({ hasText: "2024" })
      .first()
      .textContent();
    let calenderMonthAndYear = `${calenderMonth} ${calenderYear}`;
    console.log(calenderMonthAndYear);
    const expectedMonthAndYearLOng = `${expectedMonthLong} ${expectedYear}`;
    console.log(expectedMonthAndYearLOng);
    if (!calenderMonthAndYear.includes(expectedMonthAndYearLOng)) {
      while (!calenderMonthAndYear.includes(expectedMonthAndYearLOng)) {
        await this.page.getByRole("button", { name: "" }).click();
        calenderMonth = await this.page
          .locator("li")
          .filter({ hasText: "October" })
          .textContent();
        calenderYear = await this.page
          .locator("li")
          .filter({ hasText: "2024" })
          .textContent();
        calenderMonthAndYear = `${calenderMonth} ${calenderYear}`;
      }
    }
    console.log(`Trying to select date: ${expectedDate}`);
    await this.page
      .locator(".oxd-calendar-date")
      .getByText(expectedDate)
      .first()
      .click();

    return dateToAssert;
  }

  private async selectPartialDays() {
    const dropdownWrapper = this.page.locator("form i").nth(4);
    await dropdownWrapper.waitFor({ state: "visible", timeout: 60000 });
    await dropdownWrapper.click();

    const dropdownOptions = this.page.locator(
      ".oxd-select-dropdown .oxd-select-option"
    );
    const optionsText = await dropdownOptions.allTextContents();
    const validOptions = optionsText.filter(
      (option) => option != "-- Select --"
    );
    await expect(validOptions).toEqual([
      "All Days",
      "Start Day Only",
      "End Day Only",
      "Start and End Day",
    ]);

    await dropdownOptions.filter({ hasText: "All Days" }).first().click();
  }

  private async selectDropdownOption(
    dropdownIndex: number,
    expectedOptions: string[],
    desiredOption: string
  ) {
    const dropdownWrapper = this.page.locator("form i").nth(dropdownIndex);
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

    if (validOptions.includes(desiredOption)) {
      await dropdownOptions.filter({ hasText: desiredOption }).first().click();
    } else {
      console.log(
        `"${desiredOption}" option is not available in dropdown ${dropdownIndex}`
      );
    }
  }

  private async selectPartialDay() {
    await this.selectDropdownOption(
      4,
      ["All Days", "Start Day Only", "End Day Only", "Start and End Day"],
      "All Days"
    );
  }

  private async selectedAllDayChild() {
    await this.selectDropdownOption(
      5,
      ["Half Day - Morning", "Half Day - Afternoon", "Specify Time"],
      "Half Day - Morning"
    );
  }
}

export default LeavePage;
