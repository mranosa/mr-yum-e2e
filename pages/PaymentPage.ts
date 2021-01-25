import { Page } from './Page';
import { Component } from '../components/Component';

export class PaymentPage extends Page {
  phoneNumberInput: Component;
  sendSmsCodeButton: Component;
  pinCodeInput: Component;
  payNowButton: Component;

  constructor(page) {
    super(page, 'https://staging.mryum.com/demo/checkout/dine-in/payment/new');

    // TODO page components
    this.phoneNumberInput = new Component(page, this, 'input[aria-label="Please enter a phone number without the country dial code."]');
    this.sendSmsCodeButton = new Component(page, this, 'text="SEND SMS CODE"');
    this.pinCodeInput = new Component(page, this, 'input[aria-label="Please enter your pin code"]');
    this.payNowButton = new Component(page, this, 'text="PAY NOW"');
  }

  async pay(phoneNumber, pin) {
    return await Promise.all([
        this.phoneNumberInput.fill(phoneNumber),
        this.sendSmsCodeButton.click(),
        this.pinCodeInput.fill(pin),
        this.payNowButton.click()
    ]);
  }
}