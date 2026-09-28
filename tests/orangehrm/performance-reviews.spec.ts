import { test, expect } from './orangehrmFixtures';

// spec: specs/orangehrm-login-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Post-Login Workflows', () => {
  test('Search Performance reviews', async ({ loginPage, performancePage }) => {
    // 1. Log in and open Performance.
    await loginPage.login();
    await performancePage.openFromSidebar();
    await expect(performancePage.manageReviewsHeading).toBeVisible();
    await expect(performancePage.employeeReviewsHeading).toBeVisible();

    // 2. Search using the default employee and date criteria.
    await expect(performancePage.employeeFilter).toBeVisible();
    await expect(performancePage.dateFilters).toHaveCount(2);
    const initialEmployee = await performancePage.employeeFilter.inputValue();
    const initialFromDate = await performancePage.dateFilters.nth(0).inputValue();
    const initialToDate = await performancePage.dateFilters.nth(1).inputValue();
    await performancePage.searchButton.click();
    await expect.poll(async () => {
      return (await performancePage.reviewRows.count()) > 0 ||
        await performancePage.noReviewsMessage.isVisible();
    }).toBe(true);

    // 3. Reset the filters and confirm their default values are restored.
    await performancePage.resetButton.click();
    await expect(performancePage.employeeFilter).toHaveValue(initialEmployee);
    await expect(performancePage.dateFilters.nth(0)).toHaveValue(initialFromDate);
    await expect(performancePage.dateFilters.nth(1)).toHaveValue(initialToDate);
  });
});