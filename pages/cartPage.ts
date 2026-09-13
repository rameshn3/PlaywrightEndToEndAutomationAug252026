import {Locator, Page} from "@playwright/test";
import {BasePage} from "./basePage";

export class CartPage extends BasePage {
    private cartTitle: Locator;
    private cartItems: Locator      
    private continueShoppingButton: Locator;
    private checkoutButton: Locator;
    private removeButtons: Locator;
    private quantityInput: Locator;
    private itemPrice: Locator;

    constructor(page: Page) {
        super(page);
        this.cartTitle = page.locator('.title');
        this.cartItems = page.locator('.cart_item');
        this.continueShoppingButton = page.locator('button:has-text("Continue Shopping")');
        this.checkoutButton = page.locator('button:has-text("Checkout")');
        this.removeButtons = page.locator('button:has-text("Remove")');
        this.quantityInput = page.locator('.cart_quantity_input');
        this.itemPrice = page.locator('.inventory_item_price');
    }
    //check product is in cart or not
async isProductInCart(productName:string){
    return this.page.locator("[data-test='inventory-item-name']",{
        hasText: productName
    }).isVisible();
}

//cart page is loaded by checking the title
async isCartPageLoaded(): Promise<boolean> { 
    const txt = await this.cartTitle.textContent();
    return txt?.trim() === 'Your Cart';
}

async getCartTitleElement(): Promise<Locator> { 
    return this.cartTitle;
}
//click on continue shopping button
async clickContinueShoppingButton(){
    await this.continueShoppingButton.click();  
}

//click on checkout button
async clickCheckoutButton(){
    await this.checkoutButton.click();  
}

//remove product from cart
async removeProductFromCart(productName:string){
    const product = this.page.locator('.cart_item').filter({ hasText: productName });
    const removeButton = product.locator('button:has-text("Remove")');
    await removeButton.click();
}

//get product quantity in cart
async getProductQuantity(productName:string):Promise<number>{
    const product = this.page.locator('.cart_item').filter({ hasText: productName });
    const quantityText = await this.quantityInput.textContent();
    return parseInt((quantityText || '0').trim(), 10);
}

//get product price in cart
async getProductPrice(productName:string):Promise<number>{
    const product = this.page.locator('.cart_item').filter({ hasText: productName });
    const priceText = await this.itemPrice.textContent();
    return parseFloat((priceText || '0').replace('$', '').trim());
}
}