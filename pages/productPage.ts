import {Locator, Page} from "@playwright/test";
import {BasePage} from "./basePage";

export class ProductPage extends BasePage {
   private productTitle: Locator;
   private productName: Locator;
    private productDescription: Locator;
    private productPrice: Locator;
    private addToCartButton: Locator;
    private removeFromCartButton: Locator;
    private shoppingCartIcon: Locator;
    private hamburgerMenu: Locator;
    private logoutButton: Locator;
    private productList: Locator;   

    constructor(page: Page) {
        super(page);
        this.productTitle = page.locator('.title');
        this.productName = page.locator('.inventory_item_name');
        this.productDescription = page.locator('.inventory_item_desc');
        this.productPrice = page.locator('.inventory_item_price');
        this.addToCartButton = page.locator('button:has-text("Add to cart")');
        this.removeFromCartButton = page.locator('button:has-text("Remove")');
        this.shoppingCartIcon = page.locator('.shopping_cart_link');
        this.hamburgerMenu = page.locator('#react-burger-menu-btn');
        this.logoutButton = page.locator('#logout_sidebar_link');
        this.productList = page.locator('.inventory_item');
    }       
//chck product page is loaded by checking the title
    async isProductPageLoaded(): Promise<boolean> {
        const txt = await this.productTitle.textContent();
        return txt?.trim() === 'Products';
    }

    //add products by index (0,1,2...)
    async addProductToCartByIndex(index: number) {
       // const addButtons = await this.addToCartButton.allTextContents;
         const addButtons = await this.addToCartButton.elementHandles(); 
        if (index < addButtons.length) {
            await addButtons[index].click();
        } else {
            throw new Error(`Product index ${index} is out of bounds`);
        }
    }

//add product by name
    async addProductToCartByName(productName: string) {
    const product = this.page
        .locator('.inventory_item')
        .filter({ hasText: productName });

    await product.getByRole('button', { name: 'Add to cart' }).click();
}

    //remove product by name
  async removeProductFromCartByName(productName: string) {
    const product = this.page
        .locator('.inventory_item')
        .filter({ hasText: productName });

    await product.getByRole('button', { name: 'Remove' }).click();
}
    //add all products
    async addAllProductsToCart() {
        const addButtons = await this.addToCartButton.elementHandles();
        const count = addButtons.length;
        for (let i = 0; i < count; i++) {
            await addButtons[i].click();
        }
    }

    //navigate to cart page
    async goToCart() {
        await this.shoppingCartIcon.click();
    }

    //get product count in cart
    async getCartItemCount(): Promise<number> {
        if(!(await this.shoppingCartIcon.isVisible())){
             return 0;
        }
      
         const countText = await this.shoppingCartIcon.textContent();
            return countText ? parseInt(countText.trim()) : 0;
    }   

    //logout from application
    async logout() {
        await this.hamburgerMenu.click();
        await this.logoutButton.click();
    }

    async getPoductCount(): Promise<number> {   
        return await this.productList.count();
    }

    async sortProductsBy(option: string) {
        const sortSelect = this.page.locator('.product_sort_container');
        await sortSelect.selectOption({ label: option });
    }

    async getProductPrices(): Promise<number[]> {
        const priceElements = await this.productPrice.elementHandles();
        const prices = [];
        for (const element of priceElements) {
            const priceText = await element.textContent();
            if (priceText) {
                const price = parseFloat(priceText.replace('$', '').trim());
                prices.push(price);
            }
        }
        return prices;
    }   
    

}