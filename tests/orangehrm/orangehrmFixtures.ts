import { Locator, Page, test as base } from '@playwright/test';
import { BasePage } from '../../pages/basePage';

const baseUrl = process.env.ORANGEHRM_BASE_URL || 'https://opensource-demo.orangehrmlive.com';
const username = process.env.ORANGEHRM_USERNAME || 'Admin';
const password = process.env.ORANGEHRM_PASSWORD || 'admin123';

class OrangeHrmLoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
  }

  async navigateToLogin() {
    await this.navigateTo(`${baseUrl}/web/index.php/auth/login`);
  }

  async loginAs(user: string, secret: string) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(secret);
  }

  async login() {
    await this.navigateToLogin();
    await this.loginAs(username, password);
    await this.loginButton.click();
  }

  async currentUrl() {
    return this.page.url();
  }
}

class OrangeHrmDashboardPage extends BasePage {
  readonly dashboardHeading: Locator;
  readonly userMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard', exact: true });
    this.userMenu = page.locator('.oxd-userdropdown-tab');
  }

  widgetHeading(name: string) {
    return this.page.getByText(name, { exact: true });
  }

  async openPim() {
    await this.page.locator('a[href*="pim/viewPimModule"]').click();
  }

  async openDashboard() {
    await this.page.locator('a[href*="dashboard/index"]').click();
  }
}

class OrangeHrmAdminPage extends BasePage {
  readonly systemUsersHeading: Locator;
  readonly usernameFilter: Locator;
  readonly userRoleFilter: Locator;
  readonly employeeNameFilter: Locator;
  readonly statusFilter: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly adminUserRow: Locator;
  readonly recordCount: Locator;

  constructor(page: Page) {
    super(page);
    this.systemUsersHeading = page.getByRole('heading', { name: 'System Users', exact: true });
    this.usernameFilter = page.getByRole('textbox').nth(1);
    this.userRoleFilter = page.locator('.oxd-select-text').nth(0);
    this.employeeNameFilter = page.getByPlaceholder('Type for hints...');
    this.statusFilter = page.locator('.oxd-select-text').nth(1);
    this.searchButton = page.getByRole('button', { name: 'Search', exact: true });
    this.resetButton = page.getByRole('button', { name: 'Reset', exact: true });
    this.adminUserRow = page.locator('.oxd-table-body .oxd-table-row').first();
    this.recordCount = page.getByText(/\(\d+\) Records? Found/);
  }

  async openFromSidebar() {
    await this.page.getByRole('link', { name: 'Admin', exact: true }).click();
  }
}

class OrangeHrmPimPage extends BasePage {
  readonly addEmployeeHeading: Locator;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly requiredFieldErrors: Locator;
  readonly employeeInformationHeading: Locator;
  readonly employeeNameFilter: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly employeeTable: Locator;
  readonly employeeRows: Locator;

  constructor(page: Page) {
    super(page);
    this.addEmployeeHeading = page.getByRole('heading', { name: 'Add Employee', exact: true });
    this.firstNameField = page.getByPlaceholder('First Name', { exact: true });
    this.lastNameField = page.getByPlaceholder('Last Name', { exact: true });
    this.saveButton = page.getByRole('button', { name: 'Save', exact: true });
    this.cancelButton = page.getByRole('button', { name: 'Cancel', exact: true });
    this.requiredFieldErrors = page.locator('.oxd-input-field-error-message');
    this.employeeInformationHeading = page.getByRole('heading', { name: 'Employee Information', exact: true });
    this.employeeNameFilter = page.getByPlaceholder('Type for hints...').first();
    this.searchButton = page.getByRole('button', { name: 'Search', exact: true });
    this.resetButton = page.getByRole('button', { name: 'Reset', exact: true });
    this.employeeTable = page.locator('.oxd-table');
    this.employeeRows = page.locator('.oxd-table-body .oxd-table-row');
  }

  async openFromSidebar() {
    await this.page.locator('a[href*="pim/viewPimModule"]').click();
  }

  async openAddEmployee() {
    await this.page.getByRole('link', { name: 'Add Employee', exact: true }).click();
  }

  employeeRow(name: string) {
    return this.employeeRows.filter({ hasText: name }).first();
  }
}

class OrangeHrmLeavePage extends BasePage {
  readonly applyTab: Locator;
  readonly myLeaveTab: Locator;
  readonly leaveListTab: Locator;
  readonly assignLeaveTab: Locator;
  readonly leaveListHeading: Locator;
  readonly applyLeaveHeading: Locator;
  readonly searchButton: Locator;
  readonly leaveListRows: Locator;
  readonly noLeaveRecordsMessage: Locator;
  readonly noLeaveBalanceMessage: Locator;
  readonly leaveTypeControl: Locator;
  readonly leaveDateFields: Locator;

  constructor(page: Page) {
    super(page);
    this.applyTab = page.getByRole('link', { name: 'Apply', exact: true });
    this.myLeaveTab = page.getByRole('link', { name: 'My Leave', exact: true });
    this.leaveListTab = page.getByRole('link', { name: 'Leave List', exact: true });
    this.assignLeaveTab = page.getByRole('link', { name: 'Assign Leave', exact: true });
    this.leaveListHeading = page.getByRole('heading', { name: 'Leave List', exact: true });
    this.applyLeaveHeading = page.getByRole('heading', { name: 'Apply Leave', exact: true });
    this.searchButton = page.getByRole('button', { name: 'Search', exact: true });
    this.leaveListRows = page.locator('.oxd-table-body .oxd-table-row');
    this.noLeaveRecordsMessage = page.locator('span.oxd-text--span').filter({ hasText: /^No Records Found$/ });
    this.noLeaveBalanceMessage = page.getByText('No Leave Types with Leave Balance', { exact: true });
    this.leaveTypeControl = page.locator('.oxd-select-text').first();
    this.leaveDateFields = page.locator('input[placeholder="yyyy-dd-mm"]');
  }

  async openFromSidebar() {
    await this.page.locator('a[href*="leave/viewLeaveModule"]').click();
  }
}

type OrangeHrmFixtures = {
  loginPage: OrangeHrmLoginPage;
  dashboardPage: OrangeHrmDashboardPage;
  adminPage: OrangeHrmAdminPage;
  pimPage: OrangeHrmPimPage;
  leavePage: OrangeHrmLeavePage;
};

export const test = base.extend<OrangeHrmFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new OrangeHrmLoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new OrangeHrmDashboardPage(page));
  },
  adminPage: async ({ page }, use) => {
    await use(new OrangeHrmAdminPage(page));
  },
  pimPage: async ({ page }, use) => {
    await use(new OrangeHrmPimPage(page));
  },
  leavePage: async ({ page }, use) => {
    await use(new OrangeHrmLeavePage(page));
  },
});

export { expect } from '@playwright/test';
