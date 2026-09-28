# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: saucedemo/cartpage.spec.ts >> Cart page tests >> click on checkout button and verify navigation to checkout page
- Location: tests/saucedemo/cartpage.spec.ts:39:9

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - main [ref=e5]:
    - form "Login" [ref=e9]:
      - textbox "Username" [ref=e11]
      - textbox "Password" [ref=e13]
      - button "Login" [ref=e15] [cursor=pointer]
    - generic [ref=e17]:
      - generic [ref=e18]:
        - heading "Accepted usernames are:" [level=4] [ref=e19]
        - text: standard_userlocked_out_userproblem_userperformance_glitch_usererror_uservisual_user
      - generic [ref=e20]:
        - heading "Password for all users:" [level=4] [ref=e21]
        - text: secret_sauce
```

# Test source

```ts
  1  | import {test,expect} from '../../fixtures/appFixtures';
  2  | import{FileWriter} from '../../utils/fileWriter';
  3  | 
  4  | test.describe('Cart page tests', () => {
  5  | 
  6  |     test.beforeEach(async ({ loginPage,productPage,cartPage }) => {
  7  |         await loginPage.navigateTo();
  8  |         await loginPage.loginAs('STANDARD_USER');
  9  |          // ensure we are on product page
  10 |         await expect(productPage.isProductPageLoaded).toBeTruthy();
  11 |         await productPage.addProductToCartByName('Sauce Labs Bolt T-Shirt');
  12 |         const cartCount = await productPage.getCartItemCount();
  13 |         FileWriter.writeToFile('./testdata/cartCount.txt', cartCount.toString());
  14 |         await expect(cartCount).toBeGreaterThan(0);
  15 |         await productPage.goToCart();
> 16 |         await expect(await cartPage.isCartPageLoaded()).toBeTruthy();
     |                                                         ^ Error: expect(received).toBeTruthy()
  17 |        
  18 |         const cartTitleElement = await cartPage.getCartTitleElement();
  19 | 
  20 |         await expect(cartTitleElement).toHaveText('Your Cart');
  21 |         
  22 |     });
  23 | 
  24 | 
  25 |   test('click on continue shopping button and verify navigation to product page', async ({ productPage,cartPage }) => {
  26 |         await cartPage.clickContinueShoppingButton();
  27 |         await expect(productPage.isProductPageLoaded()).toBeTruthy();
  28 |     });
  29 | 
  30 | 
  31 |     test('remove product from cart and verify cart count', async ({ productPage,cartPage }) => {
  32 |         await cartPage.removeProductFromCart('Sauce Labs Bolt T-Shirt');
  33 |         const cartCount = await productPage.getCartItemCount();
  34 |         await expect(cartCount).toBe(0);
  35 |         await cartPage.clickContinueShoppingButton();
  36 |         await expect(productPage.isProductPageLoaded()).toBeTruthy();
  37 |     });
  38 | 
  39 |     test('click on checkout button and verify navigation to checkout page', async ({cartPage,checkoutPage }) => {
  40 |         await cartPage.clickCheckoutButton();
  41 |         await expect(checkoutPage.isCheckoutOverviewPageLoaded()).toBeTruthy();
  42 |     });
  43 | 
  44 |      test.afterEach(async ({ productPage }) => {
  45 |             await productPage.logout();
  46 |         });
  47 | 
  48 | });
```