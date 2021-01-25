import { Page } from "./Page";
import { Component } from "../components/Component";

export class LandingPage extends Page {
  tableServiceButton: Component;

  constructor(page) {
    super(page, 'https://staging.mryum.com/demo');

    // TODO page components
    this.tableServiceButton = new Component(page, this, 'text="Table Service"');
  }
}