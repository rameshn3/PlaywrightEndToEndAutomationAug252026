import {Locator, Page} from "@playwright/test";
import {BasePage} from "./basePage";

export class CheckoutPage extends BasePage {
    private checkoutTitle: Locator;
    private firstNameInput: Locator;
    private lastNameInput: Locator;
    private postalCodeInput: Locator
    private continueButton: Locator;
    private cancelButton: Locator
    private finishButton: Locator;
    private checkoutOverviewTitle: Locator;
    private checkoutCompleteTitle: Locator;
    private checkoutCompleteMessage: Locator;
    private backHomeButton: Locator;
    private generatePdfButton: Locator;

    constructor(page: Page) {
        super(page);
        this.checkoutTitle = page.locator('.title');
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.cancelButton = page.locator('button:has-text("Cancel")');
        this.finishButton = page.locator('button:has-text("Finish")');
        this.checkoutOverviewTitle = page.locator('.title');    
        this.checkoutCompleteTitle = page.locator('.title');
        this.checkoutCompleteMessage = page.locator('.complete-header');
        this.backHomeButton = page.locator('button:has-text("Back Home")');
        this.generatePdfButton = page.locator('button:has-text("Generate PDF order")');
    }

    async isCheckoutPageLoaded(): Promise<boolean> {
        const txt = await this.checkoutTitle.textContent();
        return txt?.trim() === 'Checkout: Your Information';
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }

    async isCheckoutOverviewPageLoaded(): Promise<boolean> {
        const txt = await this.checkoutOverviewTitle.textContent();
        return txt?.trim() === 'Checkout: Overview';
    }

    async clickFinishButton() {
        await this.finishButton.click();
    }

    async isCheckoutCompletePageLoaded(): Promise<boolean> {
        const txt = await this.checkoutCompleteTitle.textContent();
        return txt?.trim() === 'Checkout: Complete!';
    }

    async getCheckoutCompleteMessage(): Promise<string> {
        return (await this.checkoutCompleteMessage.textContent())?.trim() || '';
    }

    async clickBackHomeButton() {
        await this.backHomeButton.click();
    }

    async clickGeneratePdfButton() {
        await this.generatePdfButton.click();
    }

    async clickCancelButton() {
        await this.cancelButton.click();
    }
}