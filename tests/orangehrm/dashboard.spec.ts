import { test, expect } from './orangehrmFixtures';

// spec: specs/orangehrm-login-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Post-Login Workflows', () => {
  test('Verify dashboard widgets and module navigation', async ({ loginPage, dashboardPage }) => {
    // 1. Log in with Admin/admin123 and verify the dashboard and user menu.
    await loginPage.login();
    await expect(dashboardPage.dashboardHeading).toBeVisible();
    await expect(dashboardPage.userMenu).toBeVisible();

    // 2. Review the dashboard widgets and their data or empty states.
    for (const widgetName of [
      'Time at Work',
      'My Actions',
      'Quick Launch',
      'Buzz Latest Posts',
      'Employees on Leave Today',
      'Employee Distribution by Sub Unit',
    ]) {
      await expect(dashboardPage.widgetHeading(widgetName)).toBeVisible();
    }

    // 3. Open PIM, then return to Dashboard.
    await dashboardPage.openPim();
    expect(await loginPage.currentUrl()).toContain('/pim/viewEmployeeList');
    await dashboardPage.openDashboard();
    await expect(dashboardPage.dashboardHeading).toBeVisible();
  });
});
