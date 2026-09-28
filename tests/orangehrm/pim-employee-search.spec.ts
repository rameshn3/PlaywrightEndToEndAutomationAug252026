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
    await expect(pimPage.employeeRows.first()).toBeVisible();

    // 2. Search for an existing employee and verify matching results.
    const employeeName = await pimPage.firstEmployeeName();
    const employeeLastName = employeeName.split(/\s+/).at(-1) ?? employeeName;
    await pimPage.employeeNameFilter.fill(employeeName);
    await expect(pimPage.employeeSuggestions.first()).toBeVisible();
    await pimPage.employeeSuggestions.first().click();
    await pimPage.searchButton.click();
    await expect(pimPage.employeeRows).toHaveCount(1);
    await expect(pimPage.employeeRows.first()).toContainText(employeeLastName);

    // 3. Reset and verify the default employee list returns.
    await pimPage.resetButton.click();
    await expect(pimPage.employeeNameFilter).toHaveValue('');
    await expect(pimPage.employeeRows.first()).toBeVisible();
  });
});
