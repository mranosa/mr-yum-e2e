import { Page } from './Page';
import { Component } from '../components/Component';
import { MenuItem } from '../components/MenuItem';

export class DrinksPage extends Page {
  thanksButton: Component;
  cartButton: Component;
  menuItems: Map<string, MenuItem>;
  

  constructor(page) {
    super(page, 'https://staging.mryum.com/demo/dine-in/drinks');

    // TODO page components
    this.thanksButton = new Component(page, this, 'text="Thanks!"');
    this.cartButton = new Component(page, this, 'text="Cart"');
    this.menuItems = new Map<string, MenuItem>();
    [
      'Left Hand Negroni',
      'Latte',
      'House Rose',
      'Pinot Gri'
    ].forEach(title => {
      this.menuItems.set(title, new MenuItem(page, this, title));
    });
  }
}