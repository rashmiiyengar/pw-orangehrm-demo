import { Page, Locator } from "@playwright/test";

class DatePickerPage{

    private readonly page:Page;

    constructor(page: Page) {
        this.page = page;
      }

    //Method to select start date
    async selectStartDate(startDate: number) {
        const fromDate = this.page.locator('div.oxd-input-group:has(label:has-text("From Date")) input')
        await fromDate.click();

        this.selectDateInCalender(startDate); 
        this.page.pause();
    }

     //Method to select end date
     async selectEndDate(toDate: number) {
        const fromDate = this.page.locator('div.oxd-input-group:has(label:has-text("To Date")) input')
        await fromDate.click();

        this.selectDateInCalender(toDate); 
    }

    // Method to select a date based on an offset from today
    async selectDateInCalender(numberOfdaysFromToday:number) {
        let date = new Date();
        date.setDate(date.getDate() +numberOfdaysFromToday);
        
        const expectedDate = date.getDate().toString();
        const expectedMonthShort = date.toLocaleDateString("En-US",{month:"short"});
        const expectedMonthLong = date.toLocaleDateString("En-US",{month:"long"});
        const expectedYear = date.getFullYear();

        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

        



    }
}

export default DatePickerPage;