import { test, expect } from '@playwright/test';
import { FormPage } from '../src/pages/FormPage';
import { ENV } from '../src/env';

test('test', async ({ page }) => {
  const formPage = new FormPage(page);
  await formPage.goto();
  await formPage.fillName(ENV.username, 'Selvamani');
  await formPage.fillEmail(ENV.username + '@mailinator.com');
  await formPage.selectGender('Male');
  await formPage.fillMobile('9940667855');
  await formPage.selectDOB('1994', '6', 'Choose Monday, July 11th,');
  await formPage.addSubject('Maths');
  await formPage.selectHobby('Sports');
  await formPage.fillAddress('No : 7/169, Nehru Street, Manimedu, Thandalam');
  await formPage.selectStateAndCity('Uttar Pradesh', 'Agra', 'ta');
  await formPage.submit();
});