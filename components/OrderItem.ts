import { Component } from './Component';
import { OrderItemModal } from './OrderItemModal';

export class OrderItem extends Component {
  addToCartButton: Component;
  titleLabel: Component;
  orderItemModal: OrderItemModal;

  constructor(page, parent, title) {
    // TODO correct selector
    super(page, parent, 'div[role="dialog"]');

    this.addToCartButton = new Component(page, this, 'text="Add to cart"');
    this.titleLabel = new Component(page, this, `text="${title}"`);
    this.orderItemModal = new OrderItemModal(page, this);
  }

  async order(options = []) {
    await this.titleLabel.click();

    await this.orderItemModal.selectOptions(options);

    return this.orderItemModal.addToCartButton.click();
  }
}