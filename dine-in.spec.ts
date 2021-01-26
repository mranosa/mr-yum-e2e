import { it, expect } from "@playwright/test";
import { config } from 'folio';
import { LandingPage } from "./pages/LandingPage";
import { DineInPage } from "./pages/DineInPage";
import { DrinksPage } from "./pages/DrinksPage";
import { CartPage } from "./pages/CartPage";
import { PaymentPage } from "./pages/PaymentPage";

config.timeout = 60000;

it("flow: dine in", async ({ page }) => {
  // should be able to load demo page
  const landingPage = new LandingPage(page);
  await landingPage.visit();
  expect(page.url()).toEqual('https://staging.mryum.com/demo');

  // should be able to go to to dine in page
  await landingPage.tableServiceButton.click();
  expect(page.url()).toEqual('https://staging.mryum.com/demo/dine-in');

  // should be able to add table number
  const dineInPage = new DineInPage(page);
  await dineInPage.tableNumberModal.setTableNumber('33');

  // should be able to go to drinks page
  await dineInPage.drinksButton.click();
  expect(page.url()).toEqual('https://staging.mryum.com/demo/dine-in/drinks');

  // should be able to go close drinks page notification
  const drinksPage = new DrinksPage(page);
  await drinksPage.thanksButton.click();

  // should be able to add drinks to cart
  await drinksPage.menuItems.get('Left Hand Negroni').order();
  await drinksPage.menuItems.get('Latte').order(['Skim Milk', '1 Sugar', 'Sweet Potato Chips']);
  await drinksPage.menuItems.get('House Rose').order();
  await drinksPage.menuItems.get('Pinot Gri').order(['Bottle']);

  // should be able to go to checkout page
  await drinksPage.cartButton.click();

  // should have correct order details
  const cartPage = new CartPage(page);
  
  // assert table number
  const tableNumberButton = await cartPage.tableNumberButton.getElement();
  const tableNumberButtonText = await tableNumberButton.textContent();
  expect(tableNumberButtonText.toLowerCase()).toContain('table number 33');
  
  // assert number of items
  const cartItems = await cartPage.getCartItems();
  expect(cartItems.length).toEqual(4);

  // assert each item details
  for (const cartItem of cartItems) {
    const textContent = await cartItem.textContent();
    
    if(textContent.indexOf('Latte') > -1) {
      expect(textContent).toContain('$13.00');
      expect(textContent).toContain('Skim Milk');
      expect(textContent).toContain('1 Sugar');
      expect(textContent).toContain('Sweet Potato Chips');
    }

    if(textContent.indexOf('Pinot Gri') > -1) {
      expect(textContent).toContain('$24.00');
      expect(textContent).toContain('Bottle');
    }

    if(textContent.indexOf('House Rose') > -1) {
      expect(textContent).toContain('9.00');
    }

    if(textContent.indexOf('Left Hand Negroni') > -1) {
      expect(textContent).toContain('$18.00');
    }
  }

  // should be able to checkout
  await cartPage.checkout();
  expect(page.url()).toEqual('https://staging.mryum.com/demo/checkout/dine-in/cart');

  // should be able to pay
  const paymentPage = new PaymentPage(page);
  await paymentPage.pay('400000000', '3066');
});