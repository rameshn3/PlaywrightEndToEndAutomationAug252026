import { test, expect } from './orangehrmFixtures';

// spec: specs/orangehrm-login-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Authentication', () => {
  test('Login with valid demo credentials', async ({ loginPage, dashboardPage }) => {
    // 1. Open the OrangeHRM login URL and verify Username, Password, and Login controls.
    await loginPage.navigateToLogin();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();

    // 2. Enter Admin and admin123 and verify the password field is masked.
    await loginPage.loginAs('Admin', 'admin123');
    await expect(loginPage.usernameInput).toHaveValue('Admin');
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');

    // 3. Click Login and verify the dashboard URL and heading.
    await loginPage.loginButton.click();
    await expect(dashboardPage.dashboardHeading).toBeVisible();
    expect(await loginPage.currentUrl()).toMatch(/\/web\/index.php\/dashboard\/index/);
  });
});
