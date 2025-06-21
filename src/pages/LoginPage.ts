import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(username: string, password: string) {
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button[type="submit"]');
  }

  async gotoHome() {
    await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/');
  }

  async signup(firstName: string, lastName: string, email: string, password: string) {
    await this.page.getByRole('button', { name: 'Sign up' }).click();
    await this.page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  async updateEmail(newEmail: string) {
    await this.page.getByRole('textbox', { name: 'Email' }).click();
    await this.page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
    await this.page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
    await this.page.getByRole('textbox', { name: 'Email' }).fill(newEmail);
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }
} 