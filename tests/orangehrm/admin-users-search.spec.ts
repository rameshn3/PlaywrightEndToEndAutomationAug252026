import { test, expect } from './orangehrmFixtures';

// spec: specs/orangehrm-login-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Post-Login Workflows', () => {
  test('Search system users in Admin', async ({ loginPage, adminPage }) => {
    // 1. Log in and open Admin; verify filters are available.
    await loginPage.login();
    await adminPage.openFromSidebar();
    await expect(adminPage.systemUsersHeading).toBeVisible();
    await expect(adminPage.usernameFilter).toBeVisible();
    await expect(adminPage.userRoleFilter).toBeVisible();
    await expect(adminPage.employeeNameFilter).toBeVisible();
    await expect(adminPage.statusFilter).toBeVisible();

    // 2. Search for the existing Admin username and verify the matching row.
    await adminPage.usernameFilter.fill('Admin');
    await adminPage.searchButton.click();
    await expect(adminPage.adminUserRow).toBeVisible();
    await expect(adminPage.recordCount).toContainText('1');

    // 3. Reset filters and verify the unfiltered user list is restored.
    await adminPage.resetButton.click();
    await expect(adminPage.usernameFilter).toHaveValue('');
    await expect(adminPage.recordCount).not.toContainText('1) Record Found');
  });
});
