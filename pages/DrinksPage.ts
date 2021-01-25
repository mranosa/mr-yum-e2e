import { Page } from './Page';
import { Component } from '../components/Component';
import { OrderItem } from '../components/OrderItem';

export class DrinksPage extends Page {
  thanksButton: Component;
  cartButton: Component;
  orderItems: Map<string, OrderItem>;
  

  constructor(page) {
    super(page, 'https://staging.mryum.com/demo/dine-in/drinks');

    // TODO page components
    this.thanksButton = new Component(page, this, 'text="Thanks!"');
    this.cartButton = new Component(page, this, 'text="Cart"');
    this.orderItems = new Map<string, OrderItem>();
    [
      'Left Hand Negroni',
      'Latte',
      'House Rose',
      'Pinot Gri'
    ].forEach(title => {
      this.orderItems.set(title, new OrderItem(page, this, title));
    });
  }
}