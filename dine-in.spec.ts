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
  await drinksPage.orderItems.get('Left Hand Negroni').order();
  await drinksPage.orderItems.get('Latte').order(['Skim Milk', '1 Sugar', 'Sweet Potato Chips']);
  await drinksPage.orderItems.get('House Rose').order();
  await drinksPage.orderItems.get('Pinot Gri').order(['Bottle']);

  // should be able to go to checkout page
  await drinksPage.cartButton.click();

  // TODO should have the correct added drinks
  const cartPage = new CartPage(page);

  // should be able to checkout
  await cartPage.checkout();
  expect(page.url()).toEqual('https://staging.mryum.com/demo/checkout/dine-in/cart');

  // should be able to pay
  const paymentPage = new PaymentPage(page);
  await paymentPage.pay('400000000', '3066');
});