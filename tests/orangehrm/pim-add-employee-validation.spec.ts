import { test, expect } from './orangehrmFixtures';

// spec: specs/orangehrm-login-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Post-Login Workflows', () => {
  test('Validate employee creation form in PIM', async ({ loginPage, pimPage }) => {
    // 1. Log in, open PIM, select Add Employee, and verify the form controls.
    await loginPage.login();
    await pimPage.openFromSidebar();
    await pimPage.openAddEmployee();
    await expect(pimPage.addEmployeeHeading).toBeVisible();
    await expect(pimPage.firstNameField).toBeVisible();
    await expect(pimPage.lastNameField).toBeVisible();
    await expect(pimPage.saveButton).toBeVisible();
    await expect(pimPage.cancelButton).toBeVisible();

    // 2. Save the blank form and verify required-field errors without creating an employee.
    await pimPage.saveButton.click();
    await expect(pimPage.requiredFieldErrors.first()).toBeVisible();
    await expect(pimPage.addEmployeeHeading).toBeVisible();

    // 3. Cancel and verify the form is left without saving.
    await pimPage.cancelButton.click();
    await expect(pimPage.employeeInformationHeading).toBeVisible();
  });
});
