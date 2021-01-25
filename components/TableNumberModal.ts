import { Component } from './Component';

export class TableNumberModal extends Component {
  tableNumberInputBox: Component;
  tableNumberConfirmButton: Component;

  constructor(page, parent) {
    super(page, parent, 'div[role="dialog"]');

    this.tableNumberInputBox = new Component(page, this, 'input[name="tableNumber"]');
    this.tableNumberConfirmButton = new Component(page, this, 'text="Confirm"');
  }

  async setTableNumber(tableNumber) {
    return await Promise.all([
      await this.tableNumberInputBox.fill(tableNumber),
      await this.tableNumberConfirmButton.click()
    ]);
  }
}