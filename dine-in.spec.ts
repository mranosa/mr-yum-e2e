import { it, expect } from "@playwright/test";
import { config } from 'folio';
import { LandingPage } from "./pages/LandingPage";
import { DineInPage } from "./pages/DineInPage";
import { DrinksPage } from "./pages/DrinksPage";

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
  await page.click('text="Left Hand Negroni"');
  await page.click('text="Add to cart"');

  await page.click('text="Latte"');
  await page.click('text="Skim Milk"');
  await page.click('text="1 Sugar"');
  await page.click('text="Sweet Potato Chips"');
  await page.click('text="Add to cart"');

  await page.click('text="House Rose"');
  await page.click('text="Add to cart"');
  
  await page.click('text="Pinot Gri"');
  await page.click('text="Bottle"');
  await page.click('text="Add to cart"');

  // should be able to go to checkout page
  await drinksPage.thanksButton.click();

  // TODO should have the correct added drinks
  
  // should be able to checkout
  await page.click('//div[normalize-space(.)=\'CHECKOUT FOR TABLE 33\']');
  await page.click('text="Maybe next time"');
  expect(page.url()).toEqual('https://staging.mryum.com/demo/checkout/dine-in/cart');

  await page.fill('input[aria-label="Please enter a phone number without the country dial code."]', '400000000');
  await page.click('text="SEND SMS CODE"');
  await page.fill('input[aria-label="Please enter your pin code"]', '3066');

  await page.click('text="PAY NOW"');

  await page.waitForTimeout(5000);
});