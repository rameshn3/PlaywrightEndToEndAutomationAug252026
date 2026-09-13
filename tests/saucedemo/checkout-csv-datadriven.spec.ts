import { test, expect } from '../../fixtures/appFixtures';
import { readCSVData } from '../../utils/csvReader';

//defineth type
type CheckoutData = {
    firstName: string;
    lastName: string;
    zipCode: string;
};

//read data using genric function
const checkoutData: CheckoutData[] = readCSVData<CheckoutData>('./testdata/datadrivenCsvData.csv');


test.describe('checkout page tests', () => {
    test.beforeEach(async ({ loginPage, productPage, cartPage, checkoutPage }) => {
        await loginPage.navigateTo();
        await loginPage.loginAs('STANDARD_USER');
        // ensure we are on product page
        await expect(productPage.isProductPageLoaded).toBeTruthy();
        await productPage.addProductToCartByName('Sauce Labs Bolt T-Shirt');
        const cartCount = await productPage.getCartItemCount();
        console.log('cartcount#::', cartCount);
        await expect(cartCount).toBeGreaterThan(0);
        await productPage.goToCart();
        await expect(await cartPage.isCartPageLoaded()).toBeTruthy();
        await cartPage.clickCheckoutButton();
        await expect(checkoutPage.isCheckoutPageLoaded()).toBeTruthy();
    });

    checkoutData.forEach((data, index) => {
        test(`verify order completion flow with data set ${index + 1}-${data.firstName}${data.lastName} ${data.zipCode}`, async ({ checkoutPage }) => {
            await checkoutPage.fillCheckoutInformation(data.firstName, data.lastName, data.zipCode);
            await checkoutPage.clickContinueButton();
            await expect(checkoutPage.isCheckoutPageLoaded()).toBeTruthy();
            await checkoutPage.clickFinishButton();
            await expect(checkoutPage.getCheckoutCompleteMessage()).toBeTruthy();
            await checkoutPage.clickBackHomeButton();
        });
    });


    test.afterEach(async ({ productPage }) => {
        await productPage.logout();
    });
});