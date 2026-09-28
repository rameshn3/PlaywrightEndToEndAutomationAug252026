# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: saucedemo/products.spec.ts >> Products page Tests >> should display products and verfy product list
- Location: tests/saucedemo/products.spec.ts:11:9

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
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
  1  | import {test, expect} from '../../fixtures/appFixtures';
  2  | 
  3  | test.describe('Products page Tests', () => {
  4  |      test.beforeEach(async ({ loginPage,productPage }) => {
  5  |         await loginPage.navigateTo();
  6  |         await loginPage.loginAs('STANDARD_USER');
  7  |          // ensure we are on product page
  8  |     await expect(productPage.isProductPageLoaded).toBeTruthy();
  9  |     });
  10 | 
  11 |     test('should display products and verfy product list', async ({ productPage }) => {
  12 |         await expect(productPage.isProductPageLoaded()).toBeTruthy();
  13 |           const count = await productPage.getPoductCount();
> 14 |         await expect(count).toBeGreaterThan(0);
     |                             ^ Error: expect(received).toBeGreaterThan(expected)
  15 |          await expect(count).toBe(6);
  16 |     });
  17 | 
  18 |     test('Add products to cart and verify cart count', async ({ productPage }) => {
  19 |         await productPage.addProductToCartByIndex(0);
  20 |         await productPage.addProductToCartByIndex(1);
  21 |         const cartCount = await productPage.getCartItemCount();
  22 |         await expect(cartCount).toBe(2);
  23 |     });
  24 | 
  25 |     test('Add product by name and verify cart count', async ({ productPage }) => {
  26 |         await productPage.addProductToCartByName('Sauce Labs Bolt T-Shirt');
  27 |         const cartCount = await productPage.getCartItemCount();
  28 |         await expect(cartCount).toBe(1);
  29 |     }); 
  30 | 
  31 |     test('Remove product by name and verify cart count', async ({ productPage }) => {
  32 |          await productPage.addProductToCartByName('Sauce Labs Bolt T-Shirt');
  33 |         await productPage.removeProductFromCartByName('Sauce Labs Bolt T-Shirt');
  34 |         const cartCount = await productPage.getCartItemCount();
  35 |         await expect(cartCount).toBe(0);
  36 |     });
  37 | 
  38 |     test('Add all products to cart and verify cart count', async ({ productPage }) => {
  39 |         await productPage.addAllProductsToCart();
  40 |         const cartCount = await productPage.getCartItemCount();
  41 |         await expect(cartCount).toBe(6);
  42 |     });
  43 | 
  44 | test('sort products by price low to high and verify sorting', async ({ productPage }) => {
  45 |         await productPage.sortProductsBy('Price (low to high)');
  46 |         const prices = await productPage.getProductPrices();
  47 |         const sortedPrices = [...prices].sort((a, b) => a - b);
  48 |         expect(prices).toEqual(sortedPrices);
  49 |     });
  50 | 
  51 |     test('Navigate to cart page', async ({ productPage,cartPage }) => {
  52 |         await productPage.goToCart();
  53 |         await expect(await cartPage.isCartPageLoaded()).toBeTruthy();
  54 |     });
  55 | 
  56 |     test.afterEach(async ({ productPage }) => {
  57 |         await productPage.logout();
  58 |     });
  59 | });
```