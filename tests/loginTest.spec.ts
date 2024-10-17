import { test } from '../fixtures/Testoptions';

test('Verify that you are successfully able to login', async ({ pageManager }) => {

  await pageManager.onLoginPage().navigateTo();

  await pageManager.onLoginPage().login("Admin","admin123");
});
