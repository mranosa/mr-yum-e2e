import { Page } from './Page';
import { Component } from '../components/Component';
import { TableNumberModal } from '../components/TableNumberModal';

export class DineInPage extends Page {
  tableNumberModal: TableNumberModal;
  drinksButton: Component;

  constructor(page) {
    super(page, 'https://staging.mryum.com/demo/dine-in');

    // TODO page components
    this.tableNumberModal = new TableNumberModal(page, this, 'div[role="dialog"]');
    this.drinksButton = new Component(page, this, 'text="Drinks 🍻"');
  }
}