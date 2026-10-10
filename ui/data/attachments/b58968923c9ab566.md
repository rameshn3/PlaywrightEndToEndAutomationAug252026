# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: saucedemo/checkout-csv-datadriven.spec.ts >> checkout page tests >> verify order completion flow with data set 3-sekharts 560045
- Location: tests/saucedemo/checkout-csv-datadriven.spec.ts:32:13

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
  2  | import { readCSVData } from '../../utils/csvReader';
  3  | 
  4  | //defineth type
  5  | type CheckoutData = {
  6  |     firstName: string;
  7  |     lastName: string;
  8  |     zipCode: string;
  9  | };
  10 | 
  11 | //read data using genric function
  12 | const checkoutData: CheckoutData[] = readCSVData<CheckoutData>('./testdata/datadrivenCsvData.csv');
  13 | 
  14 | 
  15 | test.describe('checkout page tests', () => {
  16 |     test.beforeEach(async ({ loginPage, productPage, cartPage, checkoutPage }) => {
  17 |         await loginPage.navigateTo();
  18 |         await loginPage.loginAs('STANDARD_USER');
  19 |         // ensure we are on product page
  20 |         await expect(productPage.isProductPageLoaded).toBeTruthy();
  21 |         await productPage.addProductToCartByName('Sauce Labs Bolt T-Shirt');
  22 |         const cartCount = await productPage.getCartItemCount();
  23 |         console.log('cartcount#::', cartCount);
  24 |         await expect(cartCount).toBeGreaterThan(0);
  25 |         await productPage.goToCart();
> 26 |         await expect(await cartPage.isCartPageLoaded()).toBeTruthy();
     |                                                         ^ Error: expect(received).toBeTruthy()
  27 |         await cartPage.clickCheckoutButton();
  28 |         await expect(checkoutPage.isCheckoutPageLoaded()).toBeTruthy();
  29 |     });
  30 | 
  31 |     checkoutData.forEach((data, index) => {
  32 |         test(`verify order completion flow with data set ${index + 1}-${data.firstName}${data.lastName} ${data.zipCode}`, async ({ checkoutPage }) => {
  33 |             await checkoutPage.fillCheckoutInformation(data.firstName, data.lastName, data.zipCode);
  34 |             await checkoutPage.clickContinueButton();
  35 |             await expect(checkoutPage.isCheckoutPageLoaded()).toBeTruthy();
  36 |             await checkoutPage.clickFinishButton();
  37 |             await expect(checkoutPage.getCheckoutCompleteMessage()).toBeTruthy();
  38 |             await checkoutPage.clickBackHomeButton();
  39 |         });
  40 |     });
  41 | 
  42 | 
  43 |     test.afterEach(async ({ productPage }) => {
  44 |         await productPage.logout();
  45 |     });
  46 | });
```