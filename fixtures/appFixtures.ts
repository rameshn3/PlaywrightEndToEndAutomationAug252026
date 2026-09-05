import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';

type PageFixtures = {
    loginPage: LoginPage;
    checkoutPage: CheckoutPage;
    productPage: ProductPage;
    cartPage: CartPage;
};

export const test = base.extend<PageFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },

    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    }
});

export {expect} from '@playwright/test';