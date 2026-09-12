import { Locator,Page } from '@playwright/test';
import { BasePage } from './basePage';
import { getCredentials } from '../utils/auth';

export class LoginPage extends BasePage {
    private usernameInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
    private errorMessage: Locator;
    private swaglabsLogo: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('#user-name');
        //this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.locator('#password');
        //this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.locator('#login-button');
       // this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = this.page.getByRole('alert');
        this.swaglabsLogo = page.locator('div.login_logo');
    }

  async loginAs(userType: string) {
        const credentials = getCredentials(userType);
        await this.usernameInput.fill(credentials.username);
        await this.passwordInput.fill(credentials.password);
        await this.loginButton.click();
    }

    async isLogoVisible(): Promise<boolean> {
        return await this.swaglabsLogo.isVisible();
    }

   getErrorMessage() {
    return this.errorMessage;
}
}