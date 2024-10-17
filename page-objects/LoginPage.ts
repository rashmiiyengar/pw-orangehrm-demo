import { Page } from "@playwright/test";

class LoginPage{

    private readonly page: Page;

    constructor(page: Page){
        this.page=page
    }

    async navigateTo(){
        await this.page.goto('/');
    }

    async login(userName:string,password:string){
        await this.page.getByRole('textbox',{name: "Username"}).fill(userName);
        await this.page.getByRole('textbox',{name: "Password"}).fill(password);
        await this.page.getByRole("button", { name: "Login" }).click();
    }
}

export default LoginPage;