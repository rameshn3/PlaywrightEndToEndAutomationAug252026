import { test, expect } from './orangehrmFixtures';

// spec: specs/orangehrm-login-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Post-Login Workflows', () => {
  test('Search and reset the employee list', async ({ loginPage, pimPage }) => {
    // 1. Log in, open PIM, and verify filters and the employee table.
    await loginPage.login();
    await pimPage.openFromSidebar();
    await expect(pimPage.employeeInformationHeading).toBeVisible();
    await expect(pimPage.employeeNameFilter).toBeVisible();
    await expect(pimPage.employeeTable).toBeVisible();

    // 2. Search for an existing employee and verify matching results.
    await pimPage.employeeNameFilter.fill('ABBQA');
    await pimPage.searchButton.click();
    await expect(pimPage.employeeRow('ABBQA')).toBeVisible();

    // 3. Reset and verify the default employee list returns.
    await pimPage.resetButton.click();
    await expect(pimPage.employeeNameFilter).toHaveValue('');
    await expect(pimPage.employeeRows.first()).toBeVisible();
  });
});
