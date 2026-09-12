import {test, expect} from '../../fixtures/appFixtures';

test.describe('Products page Tests', () => {
     test.beforeEach(async ({ loginPage,productPage }) => {
        await loginPage.navigateTo();
        await loginPage.loginAs('STANDARD_USER');
         // ensure we are on product page
    await expect(productPage.isProductPageLoaded).toBeTruthy();
    });

    test('should display products and verfy product list', async ({ productPage }) => {
        await expect(productPage.isProductPageLoaded()).toBeTruthy();
          const count = await productPage.getPoductCount();
        await expect(count).toBeGreaterThan(0);
         await expect(count).toBe(6);
    });

    test('Add products to cart and verify cart count', async ({ productPage }) => {
        await productPage.addProductToCartByIndex(0);
        await productPage.addProductToCartByIndex(1);
        const cartCount = await productPage.getCartItemCount();
        await expect(cartCount).toBe(2);
    });

    test('Add product by name and verify cart count', async ({ productPage }) => {
        await productPage.addProductToCartByName('Sauce Labs Bolt T-Shirt');
        const cartCount = await productPage.getCartItemCount();
        await expect(cartCount).toBe(1);
    }); 

    test('Remove product by name and verify cart count', async ({ productPage }) => {
         await productPage.addProductToCartByName('Sauce Labs Bolt T-Shirt');
        await productPage.removeProductFromCartByName('Sauce Labs Bolt T-Shirt');
        const cartCount = await productPage.getCartItemCount();
        await expect(cartCount).toBe(0);
    });

    test('Add all products to cart and verify cart count', async ({ productPage }) => {
        await productPage.addAllProductsToCart();
        const cartCount = await productPage.getCartItemCount();
        await expect(cartCount).toBe(6);
    });

test('sort products by price low to high and verify sorting', async ({ productPage }) => {
        await productPage.sortProductsBy('Price (low to high)');
        const prices = await productPage.getProductPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    });

    test('Navigate to cart page', async ({ productPage,cartPage }) => {
        await productPage.goToCart();
        await expect(await cartPage.isCartPageLoaded()).toBeTruthy();
    });

    test.afterEach(async ({ productPage }) => {
        await productPage.logout();
    });
});