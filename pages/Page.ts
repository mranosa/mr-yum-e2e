export class Page {
  page: any;
  url: any;

  constructor(page, url) {
    this.page = page;
    this.url = url;
  }

  async visit() {
    return await this.page.goto(this.url);
  }
}