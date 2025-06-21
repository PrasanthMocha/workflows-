import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { FormPage } from '../src/pages/FormPage';
import { ENV } from '../src/env';

test('test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const formPage = new FormPage(page);

  await loginPage.gotoHome();
  await loginPage.signup(ENV.username, 'Selvamani', ENV.username + '@mailinator.com', ENV.password);
  await loginPage.updateEmail('prasanthates1t@mailinator.com');

  await formPage.addNewContact({
    firstName: 'Test',
    lastName: 'User',
    dob: '1994-07-11',
    email: ENV.username + 's9@mailinator.com',
    phone: '9940667854',
    address1: 'Nehru Street',
    address2: 'Manimedu',
    city: 'Chennai',
    state: 'Tamilnadu',
    postalCode: '600128',
    country: 'IND',
  });
  await formPage.updateContactEmail(ENV.username + 's89@mailinator.com');
});