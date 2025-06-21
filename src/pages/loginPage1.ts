import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly signupLoginButton: Locator;
    readonly loginEmailInput: Locator;
    readonly loginPasswordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly signupNameInput: Locator;
    readonly signupEmailInput: Locator;
    readonly signupButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signupLoginButton = page.locator("//a[normalize-space(text())='Signup / Login']");
        this.loginEmailInput = page.locator("input[data-qa='login-email']");
        this.loginPasswordInput = page.locator("input[data-qa='login-password']");
        this.loginButton = page.locator("button[data-qa='login-button']");
        this.errorMessage = page.locator("p[style='color: red;']");
        this.signupNameInput = page.locator("input[data-qa='signup-name']");
        this.signupEmailInput = page.locator("input[data-qa='signup-email']");
        this.signupButton = page.locator("button[data-qa='signup-button']");
    }

    async goto() {
        await this.page.goto('https://www.automationexercise.com/');
    }

    async clickSignupLogin() {
        await this.signupLoginButton.click();
    }

    async login(email: string, password: string) {
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(password);
        await this.loginButton.click();
    }

    async signup(name: string, email: string) {
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
        await this.signupButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

    async verifyLoginPage() {
        await expect(this.loginEmailInput).toBeVisible();
        await expect(this.loginPasswordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }
} 