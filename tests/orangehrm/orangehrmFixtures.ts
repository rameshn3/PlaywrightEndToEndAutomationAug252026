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
  readonly employeeSuggestions: Locator;

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
    this.employeeSuggestions = page.locator('.oxd-autocomplete-option');
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

  async firstEmployeeName() {
    const firstRow = this.employeeRows.first();
    const firstName = await firstRow.locator('.oxd-table-cell').nth(2).innerText();
    const lastName = await firstRow.locator('.oxd-table-cell').nth(3).innerText();
    return `${firstName} ${lastName}`.trim();
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

class OrangeHrmPerformancePage extends BasePage {
  readonly manageReviewsHeading: Locator;
  readonly employeeReviewsHeading: Locator;
  readonly employeeFilter: Locator;
  readonly dateFilters: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly reviewRows: Locator;
  readonly noReviewsMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.manageReviewsHeading = page.getByRole('heading', { name: /Manage Reviews/ });
    this.employeeReviewsHeading = page.getByRole('heading', { name: 'Employee Reviews', exact: true });
    this.employeeFilter = page.getByPlaceholder('Type for hints...');
    this.dateFilters = page.locator('input[placeholder="yyyy-dd-mm"]');
    this.searchButton = page.getByRole('button', { name: 'Search', exact: true });
    this.resetButton = page.getByRole('button', { name: 'Reset', exact: true });
    this.reviewRows = page.locator('.oxd-table-body .oxd-table-row');
    this.noReviewsMessage = page.locator('span.oxd-text--span').filter({ hasText: /^No Records Found$/ });
  }

  async openFromSidebar() {
    await this.page.locator('a[href*="performance/viewPerformanceModule"]').click();
  }
}

class OrangeHrmDirectoryPage extends BasePage {
  readonly directoryHeading: Locator;
  readonly employeeNameFilter: Locator;
  readonly jobTitleFilter: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly directoryCards: Locator;
  readonly noResultsMessage: Locator;
  readonly employeeSuggestions: Locator;

  constructor(page: Page) {
    super(page);
    this.directoryHeading = page.locator('.oxd-table-filter-title').getByText('Directory', { exact: true });
    this.employeeNameFilter = page.getByPlaceholder('Type for hints...');
    this.jobTitleFilter = page.locator('.oxd-input-group').filter({ hasText: /^Job Title/ }).locator('.oxd-select-text');
    this.searchButton = page.getByRole('button', { name: 'Search', exact: true });
    this.resetButton = page.getByRole('button', { name: 'Reset', exact: true });
    this.directoryCards = page.locator('.oxd-grid-item:has(p)');
    this.noResultsMessage = page.locator('span.oxd-text--span').filter({ hasText: /^No Records Found$/ });
    this.employeeSuggestions = page.locator('.oxd-autocomplete-option');
  }

  async openFromSidebar() {
    await this.page.locator('a[href*="directory/viewDirectory"]').click();
  }

  async firstEmployeeName() {
    return (await this.page.locator('.oxd-grid-item p').first().innerText()).trim();
  }
}

type OrangeHrmFixtures = {
  loginPage: OrangeHrmLoginPage;
  dashboardPage: OrangeHrmDashboardPage;
  adminPage: OrangeHrmAdminPage;
  pimPage: OrangeHrmPimPage;
  leavePage: OrangeHrmLeavePage;
  performancePage: OrangeHrmPerformancePage;
  directoryPage: OrangeHrmDirectoryPage;
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
  performancePage: async ({ page }, use) => {
    await use(new OrangeHrmPerformancePage(page));
  },
  directoryPage: async ({ page }, use) => {
    await use(new OrangeHrmDirectoryPage(page));
  },
});

export { expect } from '@playwright/test';
