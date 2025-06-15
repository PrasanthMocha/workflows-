import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';

test.describe('Automation Exercise Login Flow', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        await loginPage.goto();
    });

    test('successful login with valid credentials', async () => {
        await loginPage.clickSignupLogin();
        await loginPage.login('prasanthtest@mailinator.com', 'Test1234@');
        await dashboardPage.verifyLoggedIn('Prasanth Selvamani');
    });

    test('failed login with invalid credentials', async () => {
        await loginPage.clickSignupLogin();
        await loginPage.login('invalid@example.com', 'wrongpassword');
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Your email or password is incorrect!');
    });

    
});