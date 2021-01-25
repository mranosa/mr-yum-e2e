import { Component } from './Component';
import { MenuItemModal } from './MenuItemModal';

export class MenuItem extends Component {
  addToCartButton: Component;
  titleLabel: Component;
  menuItemModal: MenuItemModal;

  constructor(page, parent, title) {
    // TODO correct selector
    super(page, parent, 'div[role="dialog"]');

    this.addToCartButton = new Component(page, this, 'text="Add to cart"');
    this.titleLabel = new Component(page, this, `text="${title}"`);
    this.menuItemModal = new MenuItemModal(page, this);
  }

  async order(options = []) {
    return await Promise.all([
      await this.titleLabel.click(),
      await this.menuItemModal.selectOptions(options),
      this.menuItemModal.addToCartButton.click()
  ]);
  }
}