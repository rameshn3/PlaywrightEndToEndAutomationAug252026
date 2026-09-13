import {test,expect} from '../../fixtures/appFixtures';
import {readTestData} from '../../utils/dataReader';

//defineth type
type CheckoutData = {
    firstName: string;
    lastName: string;
    postalCode: string;
};

//read data using genric function
const checkoutData: CheckoutData = readTestData<CheckoutData>('./testdata/checkoutData.json');


test.describe('checkout page tests', () => {
    test.beforeEach(async ({ loginPage,productPage,cartPage,checkoutPage}) => {     
        await loginPage.navigateTo();
        await loginPage.loginAs('STANDARD_USER');
         // ensure we are on product page
        await expect(productPage.isProductPageLoaded).toBeTruthy();
        await productPage.addProductToCartByName('Sauce Labs Bolt T-Shirt');
        const cartCount = await productPage.getCartItemCount();
        await expect(cartCount).toBeGreaterThan(0);
        await productPage.goToCart();
        await expect(await cartPage.isCartPageLoaded()).toBeTruthy();
        await cartPage.clickCheckoutButton();
        await expect(checkoutPage.isCheckoutPageLoaded()).toBeTruthy();

    });

    test('verify order completion flow', async ({ checkoutPage }) => {
        await checkoutPage.fillCheckoutInformation(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
        await checkoutPage.clickContinueButton();
        await expect(checkoutPage.isCheckoutOverviewPageLoaded()).toBeTruthy();
        await checkoutPage.clickFinishButton();
        await expect(checkoutPage.isCheckoutCompletePageLoaded()).toBeTruthy(); 
        const completeMessage = await checkoutPage.getCheckoutCompleteMessage();
        await expect(completeMessage).toBe('Thank you for your order!');
        await checkoutPage.clickGeneratePdfButton();
        await checkoutPage.clickBackHomeButton();
             
    });

    test('verify cancel button functionality on checkout page', async ({ cartPage,checkoutPage }) => {
        await checkoutPage.clickCancelButton();
          await expect(await cartPage.isCartPageLoaded()).toBeTruthy();
    });

test('Verify cancel button in checkout overview page', async ({ checkoutPage,productPage }) => {
        await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
        await checkoutPage.clickContinueButton();
        await expect(checkoutPage.isCheckoutOverviewPageLoaded()).toBeTruthy();
        await checkoutPage.clickCancelButton();
        await expect(productPage.isProductPageLoaded()).toBeTruthy();
    }   
    );

     test.afterEach(async ({ productPage }) => {
            await productPage.logout();
        });
});