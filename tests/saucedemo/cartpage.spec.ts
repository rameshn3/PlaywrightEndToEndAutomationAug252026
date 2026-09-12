import {test,expect} from '../../fixtures/appFixtures';
import{FileWriter} from '../../utils/fileWriter';

test.describe('Cart page tests', () => {

    test.beforeEach(async ({ loginPage,productPage,cartPage }) => {
        await loginPage.navigateTo();
        await loginPage.loginAs('STANDARD_USER');
         // ensure we are on product page
        await expect(productPage.isProductPageLoaded).toBeTruthy();
        await productPage.addProductToCartByName('Sauce Labs Bolt T-Shirt');
        const cartCount = await productPage.getCartItemCount();
        FileWriter.writeToFile('./testdata/cartCount.txt', cartCount.toString());
        await expect(cartCount).toBeGreaterThan(0);
        await productPage.goToCart();
        await expect(await cartPage.isCartPageLoaded()).toBeTruthy();
       
        const cartTitleElement = await cartPage.getCartTitleElement();

        await expect(cartTitleElement).toHaveText('Your Cart');
        
    });


  test('click on continue shopping button and verify navigation to product page', async ({ productPage,cartPage }) => {
        await cartPage.clickContinueShoppingButton();
        await expect(productPage.isProductPageLoaded()).toBeTruthy();
    });


    test('remove product from cart and verify cart count', async ({ productPage,cartPage }) => {
        await cartPage.removeProductFromCart('Sauce Labs Bolt T-Shirt');
        const cartCount = await productPage.getCartItemCount();
        await expect(cartCount).toBe(0);
        await cartPage.clickContinueShoppingButton();
        await expect(productPage.isProductPageLoaded()).toBeTruthy();
    });

    test('click on checkout button and verify navigation to checkout page', async ({cartPage,checkoutPage }) => {
        await cartPage.clickCheckoutButton();
        await expect(checkoutPage.isCheckoutOverviewPageLoaded()).toBeTruthy();
    });

     test.afterEach(async ({ productPage }) => {
            await productPage.logout();
        });

});