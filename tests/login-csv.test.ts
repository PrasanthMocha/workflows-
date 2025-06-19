import { test, expect, chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

// Interface for our test data
interface LoginTestData {
    email: string;
    password: string;
    expected_result: string;
}

// Read and parse the CSV file
function loadTestData(): LoginTestData[] {
    const csvFilePath = path.resolve(__dirname, '../test-data/login-credentials.csv');
    const fileContent = fs.readFileSync(csvFilePath, 'utf-8');
    return parse(fileContent, {
        columns: true,
        skip_empty_lines: true
    });
}

test.describe('CSV Driven Login Tests', () => {
    const testData = loadTestData();

    for (const data of testData) {
        const testTitle = `Login test - Email: ${data.email || 'empty'} - Password: ${data.password ? '*****' : 'empty'} - Expected: ${data.expected_result}`;
        
        test(testTitle, async ({ page }) => {
            // Set longer timeout for slow responses
            test.setTimeout(30000);

            try {
                // Navigate to the website
                await page.goto('https://www.automationexercise.com/', { waitUntil: 'networkidle' });
                
                // Wait for and click on Signup / Login button
                const loginButton = page.locator("//a[normalize-space(text())='Signup / Login']");
                await loginButton.waitsFor({ state: 'visible' });
                await loginButton.click();
                
                // Wait for login form to be visible
                await page.waitForSelector("input[data-qa='login-email']", { state: 'visible' });
                
                // Fill in login credentials
                await page.fill("input[data-qa='login-email']", data.email);
                await page.fill("input[data-qa='login-password']", data.password);
                
                // Click login button and wait for navigation
                await Promise.all([
                    page.waitForLoadState('networkidle'),
                    page.click("button[data-qa='login-button']")
                ]);

                if (data.expected_result === 'success') {
                    // Wait for and verify successful login
                    //const loggedInText = page.locator("//a[contains(text(),'Logged in as')]");
                    //await expect(loggedInText).toBeVisible({ timeout: 10000 });
                    
                    // Click logout and wait for navigation
                    await Promise.all([
                        page.waitForLoadState('networkidle'),
                        page.click("//a[normalize-space()='Logout']")
                    ]);
                } else {
                    // Wait for and verify error message
                   // const errorMessage = page.locator("p[style*='color: red']");
                    //await expect(errorMessage).toBeVisible({ timeout: 10000 });
                }

            } catch (error) {
                console.error(`Test failed for email: ${data.email}`, error);
                throw error;
            }
        });
    }
}); 