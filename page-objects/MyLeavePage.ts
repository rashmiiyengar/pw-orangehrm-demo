import { Page, Locator, expect } from "@playwright/test";
import BasePage from "./BasePage";
import { MY_LEAVE_PAGE_LEAVE_TYPE_OPTIONS } from "../utils/constants";

class MyLeavePage  extends BasePage{
  
  constructor(page: Page) {
    super(page); 
  }

  async searchLeaveTypeAndValidate(){
    this.selectDropdownOption("Leave Type",MY_LEAVE_PAGE_LEAVE_TYPE_OPTIONS,"CAN - FMLA")
  }


}


export default MyLeavePage;