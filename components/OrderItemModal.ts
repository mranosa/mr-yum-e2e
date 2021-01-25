import { Component } from './Component';

export class OrderItemModal extends Component {
  addToCartButton: Component;

  constructor(page, parent) {
    // TODO correct selector
    super(page, parent, 'div[role="dialog"]');

    this.addToCartButton = new Component(page, this, 'text="Add to cart"');
  }

  // TODO Refactor implementation to become a dynamic component... how?
  async selectOptions(options) {
    let optionActions = [];
    
    options.forEach(option => {
      optionActions.push(this.page.click(`text="${option}"`));
    });
    
    return await Promise.all(optionActions);
  }
}