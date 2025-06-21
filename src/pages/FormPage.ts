import { Page } from '@playwright/test';

export class FormPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://demoqa.com/automation-practice-form');
  }

  async fillName(firstName: string, lastName: string) {
    await this.page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
  }

  async fillEmail(email: string) {
    await this.page.getByRole('textbox', { name: 'name@example.com' }).fill(email);
  }

  async selectGender(gender: string) {
    await this.page.getByText(gender, { exact: true }).click();
  }

  async fillMobile(mobile: string) {
    await this.page.getByRole('textbox', { name: 'Mobile Number' }).fill(mobile);
  }

  async selectDOB(year: string, month: string, dayOptionName: string) {
    await this.page.locator('#dateOfBirthInput').click();
    await this.page.getByRole('combobox').nth(1).selectOption(year);
    await this.page.locator('div').filter({ hasText: /^JanuaryFebruaryMarchAprilMayJuneJulyAugustSeptemberOctoberNovemberDecember$/ }).getByRole('combobox').selectOption(month);
    await this.page.getByRole('option', { name: dayOptionName }).click();
  }

  async addSubject(subject: string) {
    await this.page.locator('.subjects-auto-complete__value-container').click();
    await this.page.locator('#subjectsInput').fill(subject);
    await this.page.locator('#react-select-2-option-0').click();
  }

  async selectHobby(hobby: string) {
    await this.page.getByText(hobby).click();
  }

  async fillAddress(address: string) {
    await this.page.getByRole('textbox', { name: 'Current Address' }).fill(address);
  }

  async selectStateAndCity(state: string, city: string, stateInput: string) {
    await this.page.locator('#state svg').click();
    await this.page.locator('#react-select-3-input').fill(stateInput);
    await this.page.locator('#state svg').click();
    await this.page.locator('.css-1gtu0rj-indicatorContainer').click();
    await this.page.getByText(state, { exact: true }).click();
    await this.page.locator('#city svg').click();
    await this.page.getByText(city, { exact: true }).click();
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  async addNewContact(contact: {
    firstName: string;
    lastName: string;
    dob: string;
    email: string;
    phone: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }) {
    await this.page.getByRole('button', { name: 'Add a New Contact' }).click();
    await this.page.getByRole('textbox', { name: '* First Name:' }).fill(contact.firstName);
    await this.page.getByRole('textbox', { name: '* Last Name:' }).fill(contact.lastName);
    await this.page.getByRole('textbox', { name: 'Date of Birth:' }).fill(contact.dob);
    await this.page.getByRole('textbox', { name: 'Email:' }).fill(contact.email);
    await this.page.getByRole('textbox', { name: 'Phone:' }).fill(contact.phone);
    await this.page.getByRole('textbox', { name: 'Street Address 1:' }).fill(contact.address1);
    await this.page.getByRole('textbox', { name: 'Street Address 2:' }).fill(contact.address2);
    await this.page.getByRole('textbox', { name: 'City:' }).fill(contact.city);
    await this.page.getByRole('textbox', { name: 'State or Province:' }).fill(contact.state);
    await this.page.getByRole('textbox', { name: 'Postal Code:' }).fill(contact.postalCode);
    await this.page.getByRole('textbox', { name: 'Country:' }).fill(contact.country);
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  async updateContactEmail(newEmail: string) {
    await this.page.getByRole('textbox', { name: 'Email:' }).click();
    for (let i = 0; i < 5; i++) {
      await this.page.getByRole('textbox', { name: 'Email:' }).press('ArrowRight');
    }
    await this.page.getByRole('textbox', { name: 'Email:' }).fill(newEmail);
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }
} 