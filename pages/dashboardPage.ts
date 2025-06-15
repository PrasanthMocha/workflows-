import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly loggedInAs: Locator;
    readonly deleteAccountButton: Locator;
    readonly logoutButton: Locator;
    readonly productsButton: Locator;
    readonly cartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loggedInAs = page.locator("//b[normalize-space(text())='Prasanth Selvamani']");
        this.deleteAccountButton = page.locator("//a[normalize-space(text())='Delete Account']");
        this.logoutButton = page.locator("//a[normalize-space(text())='Logout']");
        this.productsButton = page.locator("//a[normalize-space(text())='Products']");
        this.cartButton = page.locator("//a[normalize-space(text())='Cart']");
    }

    async verifyLoggedIn(name: string) {
        await expect(this.loggedInAs).toHaveText(name);
    }

    async logout() {
        await this.logoutButton.click();
    }

    async deleteAccount() {
        await this.deleteAccountButton.click();
    }

    async navigateToProducts() {
        await this.productsButton.click();
    }

    async navigateToCart() {
        await this.cartButton.click();
    }

    async isUserLoggedIn() {
        return await this.loggedInAs.isVisible();
    }
} 