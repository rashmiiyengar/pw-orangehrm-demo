import { Page, Locator, expect } from "@playwright/test";

class LeavePage {
  private readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async submitLeaveRequest() {
    await this.page.locator("form i").first().waitFor({ state: "visible" });
    await this.page.locator("form i").first().click();

    await this.page.getByRole("option", { name: "CAN - FMLA" }).click();

    await this.selectStartDate(0);
    await this.selectEndDate(4);
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
      .getByText(expectedDate).first()
      .click();

    return dateToAssert;
  }
}

export default LeavePage;
