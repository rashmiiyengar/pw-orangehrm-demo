import {test as base} from '@playwright/test';
import PageManager from '../page-objects/pageManager';

export type TestOptions ={

    pageManager: PageManager;

}

export const test = base.extend<TestOptions>({

    pageManager:async ({page},use) => {
        const pm = new PageManager(page);
        await pm.onLoginPage().navigateTo();
        await pm.onLoginPage().login("Admin","admin123");
        await pm.onDashboardPage().navigateTo();
        await use(pm);
    }
})