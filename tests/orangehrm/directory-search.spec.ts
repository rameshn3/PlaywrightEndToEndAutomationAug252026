import { test, expect } from './orangehrmFixtures';

// spec: specs/orangehrm-login-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Post-Login Workflows', () => {
  test('Search the employee Directory and reset filters', async ({ loginPage, directoryPage }) => {
    // 1. Log in and open Directory; verify employee and job title filters.
    await loginPage.login();
    await directoryPage.openFromSidebar();
    await expect(directoryPage.directoryHeading).toBeVisible();
    await expect(directoryPage.employeeNameFilter).toBeVisible();
    await expect(directoryPage.jobTitleFilter).toBeVisible();

    await expect.poll(async () => await directoryPage.directoryCards.count()).toBeGreaterThan(0);
    const initialDirectoryCount = await directoryPage.directoryCards.count();
    let employeeName: string;

    if (initialDirectoryCount > 0) {
      employeeName = await directoryPage.firstEmployeeName();
      await directoryPage.employeeNameFilter.fill(employeeName);
      await expect(directoryPage.employeeSuggestions.first()).toBeVisible();
      await directoryPage.employeeSuggestions.first().click();
    } else {
      employeeName = 'OrangeHRM Directory Test';
      await directoryPage.employeeNameFilter.fill(employeeName);
    }

    // 2. Search the selected employee and verify a result or clear no-results state.
    await directoryPage.searchButton.click();
    if (initialDirectoryCount > 0) {
      await expect(directoryPage.directoryCards.filter({ hasText: employeeName }).first()).toBeVisible();
    } else {
      await expect(directoryPage.noResultsMessage).toBeVisible();
    }

    // 3. Reset filters and confirm the directory returns to its initial state.
    await directoryPage.resetButton.click();
    await expect(directoryPage.employeeNameFilter).toHaveValue('');
    if (initialDirectoryCount > 0) {
      await expect(directoryPage.directoryCards.first()).toBeVisible();
    } else {
      await expect(directoryPage.noResultsMessage).toBeVisible();
    }
  });
});