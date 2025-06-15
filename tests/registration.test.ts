import { test, expect, chromium } from '@playwright/test';

test.describe('User Registration Tests', () => {
    test('Successful user registration with valid data', async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        // Navigate to the website
        await page.goto('https://www.automationexercise.com/');
        
        // Click on Signup / Login button
        await page.click("//a[normalize-space(text())='Signup / Login']");
        
        // Fill in the signup form
        await page.fill("input[data-qa='signup-name']", "Test User");
        await page.fill("input[data-qa='signup-email']", `test${Date.now()}@example.com`);
        await page.click("button[data-qa='signup-button']");

        // Fill in the account information form
        await page.click("input#id_gender1"); // Select Mr.
        await page.fill("input#password", "Test1234@");
        await page.selectOption("select#days", "15");
        await page.selectOption("select#months", "6");
        await page.selectOption("select#years", "1990");
        
        // Fill address information
        await page.fill("input#first_name", "Test");
        await page.fill("input#last_name", "User");
        await page.fill("input#address1", "123 Test Street");
        await page.fill("input#state", "Test State");
        await page.fill("input#city", "Test City");
        await page.fill("input#zipcode", "12345");
        await page.fill("input#mobile_number", "1234567890");
        
        // Submit the form
        await page.click("button[data-qa='create-account']");
        
        // Verify successful registration
        await expect(page.locator("h2[data-qa='account-created']")).toBeVisible();
        
        await browser.close();
    });

    test('Registration with existing email', async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://www.automationexercise.com/');
        await page.click("//a[normalize-space(text())='Signup / Login']");
        
        // Use an existing email
        await page.fill("input[data-qa='signup-name']", "Test User");
        await page.fill("input[data-qa='signup-email']", "prasanthtest@mailinator.com");
        await page.click("button[data-qa='signup-button']");
        
        // Verify error message
        await expect(page.locator("p[style*='color: red']")).toContainText("Email Address already exist!");
        
        await browser.close();
    });

    test('Registration with empty required fields', async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://www.automationexercise.com/');
        await page.click("//a[normalize-space(text())='Signup / Login']");
        
        // Try to submit without filling required fields
        await page.click("button[data-qa='signup-button']");
        
        // Verify form validation
        await expect(page.locator("input[data-qa='signup-name']")).toHaveAttribute("required", "");
        await expect(page.locator("input[data-qa='signup-email']")).toHaveAttribute("required", "");
        
        await browser.close();
    });

    test('Password validation during registration', async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://www.automationexercise.com/');
        await page.click("//a[normalize-space(text())='Signup / Login']");
        
        // Fill initial signup form
        await page.fill("input[data-qa='signup-name']", "Test User");
        await page.fill("input[data-qa='signup-email']", `test${Date.now()}@example.com`);
        await page.click("button[data-qa='signup-button']");
        
        // Try with a short password
        await page.fill("input#password", "123");
        
        // Submit form and expect it to not proceed
        await page.click("button[data-qa='create-account']");
        
        // Verify form is still present (didn't proceed)
        await expect(page.locator("input#password")).toBeVisible();
        
        await browser.close();
    });
}); 