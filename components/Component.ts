export class Component {
  page: any;
  parent: any;
  selector: any;

  constructor(page, parent, selector) {
    this.page = page;
    this.parent = parent;
    this.selector = selector;
  }

  async getElement() {
    return await this.page.$(this.selector);
  }

  async click() {
    return await this.page.click(this.selector);
  }

  async fill(value) {
    return await this.page.fill(this.selector, value);
  }
}