import { Page } from './Page';
import { Component } from '../components/Component';

export class CartPage extends Page {
  checkoutButton: Component;
  nextTimeButton: Component;

  constructor(page) {
    super(page, 'https://staging.mryum.com/checkout/dine-in/cart');

    // TODO page components
    this.checkoutButton = new Component(page, this, '//div[normalize-space(.)=\'CHECKOUT FOR TABLE 33\']'); // TODO ask devs for dedicated ids for UI components
    this.nextTimeButton = new Component(page, this, 'text="Maybe next time"');
  }

  async checkout() {
    return await Promise.all([
        this.checkoutButton.click(),
        this.nextTimeButton.click()
    ]);
  }
}