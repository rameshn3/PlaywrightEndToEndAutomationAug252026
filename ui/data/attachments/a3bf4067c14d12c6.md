# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: saucedemo/checkout.spec.ts >> checkout page tests >> Verify cancel button in checkout overview page
- Location: tests/saucedemo/checkout.spec.ts:49:5

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
  2  | import {readTestData} from '../../utils/dataReader';
  3  | 
  4  | //defineth type
  5  | type CheckoutData = {
  6  |     firstName: string;
  7  |     lastName: string;
  8  |     postalCode: string;
  9  | };
  10 | 
  11 | //read data using genric function
  12 | const checkoutData: CheckoutData = readTestData<CheckoutData>('./testdata/checkoutData.json');
  13 | 
  14 | 
  15 | test.describe('checkout page tests', () => {
  16 |     test.beforeEach(async ({ loginPage,productPage,cartPage,checkoutPage}) => {     
  17 |         await loginPage.navigateTo();
  18 |         await loginPage.loginAs('STANDARD_USER');
  19 |          // ensure we are on product page
  20 |         await expect(productPage.isProductPageLoaded).toBeTruthy();
  21 |         await productPage.addProductToCartByName('Sauce Labs Bolt T-Shirt');
  22 |         const cartCount = await productPage.getCartItemCount();
  23 |         await expect(cartCount).toBeGreaterThan(0);
  24 |         await productPage.goToCart();
> 25 |         await expect(await cartPage.isCartPageLoaded()).toBeTruthy();
     |                                                         ^ Error: expect(received).toBeTruthy()
  26 |         await cartPage.clickCheckoutButton();
  27 |         await expect(checkoutPage.isCheckoutPageLoaded()).toBeTruthy();
  28 | 
  29 |     });
  30 | 
  31 |     test('verify order completion flow', async ({ checkoutPage }) => {
  32 |         await checkoutPage.fillCheckoutInformation(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
  33 |         await checkoutPage.clickContinueButton();
  34 |         await expect(checkoutPage.isCheckoutOverviewPageLoaded()).toBeTruthy();
  35 |         await checkoutPage.clickFinishButton();
  36 |         await expect(checkoutPage.isCheckoutCompletePageLoaded()).toBeTruthy(); 
  37 |         const completeMessage = await checkoutPage.getCheckoutCompleteMessage();
  38 |         await expect(completeMessage).toBe('Thank you for your order!');
  39 |         await checkoutPage.clickGeneratePdfButton();
  40 |         await checkoutPage.clickBackHomeButton();
  41 |              
  42 |     });
  43 | 
  44 |     test('verify cancel button functionality on checkout page', async ({ cartPage,checkoutPage }) => {
  45 |         await checkoutPage.clickCancelButton();
  46 |           await expect(await cartPage.isCartPageLoaded()).toBeTruthy();
  47 |     });
  48 | 
  49 | test('Verify cancel button in checkout overview page', async ({ checkoutPage,productPage }) => {
  50 |         await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
  51 |         await checkoutPage.clickContinueButton();
  52 |         await expect(checkoutPage.isCheckoutOverviewPageLoaded()).toBeTruthy();
  53 |         await checkoutPage.clickCancelButton();
  54 |         await expect(productPage.isProductPageLoaded()).toBeTruthy();
  55 |     }   
  56 |     );
  57 | 
  58 |      test.afterEach(async ({ productPage }) => {
  59 |             await productPage.logout();
  60 |         });
  61 | });
```