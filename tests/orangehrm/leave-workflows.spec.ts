import { test, expect } from './orangehrmFixtures';

// spec: specs/orangehrm-login-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Post-Login Workflows', () => {
  test('Review Leave views and apply-form availability', async ({ loginPage, leavePage }) => {
    // 1. Log in, open Leave, and verify its navigation tabs.
    await loginPage.login();
    await leavePage.openFromSidebar();
    await expect(leavePage.applyTab).toBeVisible();
    await expect(leavePage.myLeaveTab).toBeVisible();
    await expect(leavePage.leaveListTab).toBeVisible();
    await expect(leavePage.assignLeaveTab).toBeVisible();

    // 2. Search Leave List with default criteria and verify results or the empty state.
    await leavePage.leaveListTab.click();
    await expect(leavePage.leaveListHeading).toBeVisible();
    await leavePage.searchButton.click();
    if (await leavePage.leaveListRows.count()) {
      await expect(leavePage.leaveListRows.first()).toBeVisible();
    } else {
      await expect(leavePage.noLeaveRecordsMessage).toBeVisible();
    }

    // 3. Inspect Apply for available leave types and balances without submitting.
    await leavePage.applyTab.click();
    await expect(leavePage.applyLeaveHeading).toBeVisible();
    if (await leavePage.noLeaveBalanceMessage.isVisible()) {
      await expect(leavePage.noLeaveBalanceMessage).toBeVisible();
    } else {
      await expect(leavePage.leaveTypeControl).toBeVisible();
      await expect(leavePage.leaveDateFields.first()).toBeVisible();
    }
  });
});
