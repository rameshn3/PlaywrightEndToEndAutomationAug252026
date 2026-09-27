# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: saucedemo/products.spec.ts >> Products page Tests >> Add products to cart and verify cart count
- Location: tests/saucedemo/products.spec.ts:18:9

# Error details

```
Error: Product index 0 is out of bounds
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
  1   | import {Locator, Page} from "@playwright/test";
  2   | import {BasePage} from "./basePage";
  3   | 
  4   | export class ProductPage extends BasePage {
  5   |    private productTitle: Locator;
  6   |    private productName: Locator;
  7   |     private productDescription: Locator;
  8   |     private productPrice: Locator;
  9   |     private addToCartButton: Locator;
  10  |     private removeFromCartButton: Locator;
  11  |     private shoppingCartIcon: Locator;
  12  |     private hamburgerMenu: Locator;
  13  |     private logoutButton: Locator;
  14  |     private productList: Locator;   
  15  | 
  16  |     constructor(page: Page) {
  17  |         super(page);
  18  |         this.productTitle = page.locator('.title');
  19  |         this.productName = page.locator('.inventory_item_name');
  20  |         this.productDescription = page.locator('.inventory_item_desc');
  21  |         this.productPrice = page.locator('.inventory_item_price');
  22  |         this.addToCartButton = page.locator('button:has-text("Add to cart")');
  23  |         this.removeFromCartButton = page.locator('button:has-text("Remove")');
  24  |         this.shoppingCartIcon = page.locator('.shopping_cart_link');
  25  |         this.hamburgerMenu = page.locator('#react-burger-menu-btn');
  26  |         this.logoutButton = page.locator('#logout_sidebar_link');
  27  |         this.productList = page.locator('.inventory_item');
  28  |     }       
  29  | //chck product page is loaded by checking the title
  30  |     async isProductPageLoaded(): Promise<boolean> {
  31  |         const txt = await this.productTitle.textContent();
  32  |         return txt?.trim() === 'Products';
  33  |     }
  34  | 
  35  |     //add products by index (0,1,2...)
  36  |     async addProductToCartByIndex(index: number) {
  37  |        // const addButtons = await this.addToCartButton.allTextContents;
  38  |          const addButtons = await this.addToCartButton.elementHandles(); 
  39  |         if (index < addButtons.length) {
  40  |             await addButtons[index].click();
  41  |         } else {
> 42  |             throw new Error(`Product index ${index} is out of bounds`);
      |                   ^ Error: Product index 0 is out of bounds
  43  |         }
  44  |     }
  45  | 
  46  | //add product by name
  47  |     async addProductToCartByName(productName: string) {
  48  |     const product = this.page
  49  |         .locator('.inventory_item')
  50  |         .filter({ hasText: productName });
  51  | 
  52  |     await product.getByRole('button', { name: 'Add to cart' }).click();
  53  | }
  54  | 
  55  |     //remove product by name
  56  |   async removeProductFromCartByName(productName: string) {
  57  |     const product = this.page
  58  |         .locator('.inventory_item')
  59  |         .filter({ hasText: productName });
  60  | 
  61  |     await product.getByRole('button', { name: 'Remove' }).click();
  62  | }
  63  |     //add all products
  64  |     async addAllProductsToCart() {
  65  |         const addButtons = await this.addToCartButton.elementHandles();
  66  |         const count = addButtons.length;
  67  |         console.log(`Total products found: ${count}`);
  68  |          await this.page.waitForTimeout(1000);
  69  |         for (let i = 0; i < count; i++) {
  70  |             await addButtons[i].click();
  71  |             //add some wait to avoid flakiness
  72  |             await this.page.waitForTimeout(1000);
  73  |         }
  74  |     }
  75  | 
  76  |     //navigate to cart page
  77  |     async goToCart() {
  78  |         await this.shoppingCartIcon.click();
  79  |     }
  80  | 
  81  |     //get product count in cart
  82  |     async getCartItemCount(): Promise<number> {
  83  |         if(!(await this.shoppingCartIcon.isVisible())){
  84  |              return 0;
  85  |         }
  86  |       
  87  |          const countText = await this.shoppingCartIcon.textContent();
  88  |             return countText ? parseInt(countText.trim()) : 0;
  89  |     }   
  90  | 
  91  |     //logout from application
  92  |     async logout() {
  93  |         await this.hamburgerMenu.click();
  94  |         await this.logoutButton.click();
  95  |     }
  96  | 
  97  |     async getPoductCount(): Promise<number> {   
  98  |         return await this.productList.count();
  99  |     }
  100 | 
  101 |     async sortProductsBy(option: string) {
  102 |         const sortSelect = this.page.locator('.product_sort_container');
  103 |         await sortSelect.selectOption({ label: option });
  104 |     }
  105 | 
  106 |     async getProductPrices(): Promise<number[]> {
  107 |         const priceElements = await this.productPrice.elementHandles();
  108 |         const prices = [];
  109 |         for (const element of priceElements) {
  110 |             const priceText = await element.textContent();
  111 |             if (priceText) {
  112 |                 const price = parseFloat(priceText.replace('$', '').trim());
  113 |                 prices.push(price);
  114 |             }
  115 |         }
  116 |         return prices;
  117 |     }   
  118 |     
  119 | 
  120 | }
```