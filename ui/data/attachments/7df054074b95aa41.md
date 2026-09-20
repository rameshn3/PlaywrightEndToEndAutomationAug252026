# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: saucedemo/checkout-datadriven.spec.ts >> checkout page tests >> verify order completion flow with data set 2-JaneSmith 54321
- Location: tests/saucedemo/checkout-datadriven.spec.ts:33:13

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
  1  | import { test, expect } from '../../fixtures/appFixtures';
  2  | import { readTestData } from '../../utils/dataReader';
  3  | 
  4  | //defineth type
  5  | type CheckoutData = {
  6  |     forEach(arg0: (data: any, index: any) => void): unknown;
  7  |     firstName: string;
  8  |     lastName: string;
  9  |     postalCode: string;
  10 | };
  11 | 
  12 | //read data using genric function
  13 | const checkoutData: CheckoutData = readTestData<CheckoutData[]>('./testdata/datadrivenData.json');
  14 | 
  15 | 
  16 | test.describe('checkout page tests', () => {
  17 |     test.beforeEach(async ({ loginPage, productPage, cartPage, checkoutPage }) => {
  18 |         await loginPage.navigateTo();
  19 |         await loginPage.loginAs('STANDARD_USER');
  20 |         // ensure we are on product page
  21 |         await expect(productPage.isProductPageLoaded).toBeTruthy();
  22 |         await productPage.addProductToCartByName('Sauce Labs Bolt T-Shirt');
  23 |         const cartCount = await productPage.getCartItemCount();
  24 |         console.log('cartcount#::', cartCount);
  25 |         await expect(cartCount).toBeGreaterThan(0);
  26 |         await productPage.goToCart();
> 27 |         await expect(await cartPage.isCartPageLoaded()).toBeTruthy();
     |                                                         ^ Error: expect(received).toBeTruthy()
  28 |         await cartPage.clickCheckoutButton();
  29 |         await expect(checkoutPage.isCheckoutPageLoaded()).toBeTruthy();
  30 |     });
  31 | 
  32 |     checkoutData.forEach((data, index) => {
  33 |         test(`verify order completion flow with data set ${index + 1}-${data.firstName}${data.lastName} ${data.postalCode}`, async ({ checkoutPage }) => {
  34 |             await checkoutPage.fillCheckoutInformation(data.firstName, data.lastName, data.postalCode);
  35 |             await checkoutPage.clickContinueButton();
  36 |             await expect(checkoutPage.isCheckoutPageLoaded()).toBeTruthy();
  37 |             await checkoutPage.clickFinishButton();
  38 |             await expect(checkoutPage.getCheckoutCompleteMessage()).toBeTruthy();
  39 |             await checkoutPage.clickBackHomeButton();
  40 |         });
  41 |     });
  42 | 
  43 | 
  44 |     test.afterEach(async ({ productPage }) => {
  45 |         await productPage.logout();
  46 |     });
  47 | });
```