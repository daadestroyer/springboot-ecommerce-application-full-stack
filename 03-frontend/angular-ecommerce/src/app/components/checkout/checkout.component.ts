import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartItem } from '../../entitys/cart-item';
import { CartService } from '../../services/cart.service';
import { CheckoutFormService } from '../../services/checkout-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  cartItems: CartItem[] = [];
  totalPrice = 0;

  totalQty = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private checkOutFormService: CheckoutFormService
  ) {}

  ngOnInit(): void {
    this.listCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingaddress: this.formBuilder.group({
        addr1: [''],
        addr2: [''],
        country: [''],
        state: [''],
        zip: [''],
      }),
      billingaddress: this.formBuilder.group({
        addr1: [''],
        addr2: [''],
        country: [''],
        state: [''],
        zip: [''],
      }),
      payment: this.formBuilder.group({
        cardtype: [''],
        nameoncard: [''],
        cardnumber: [''],
        expirationmonth: [''],
        expirationyear: [''],
        cvv: [''],
      }),
    });

    // populate credit card months
    const startMonth: number = new Date().getMonth() + 1; // get the current month remember 0-based
    console.log(startMonth);

    this.checkOutFormService
      .getCreditCardMonths(startMonth)
      .subscribe((data) => {
        console.log('Retrieved Credit Card Months : ' + JSON.stringify(data));
        this.creditCardMonths = data;
      });

    // populate credit card years
    this.checkOutFormService.getCreditCardYears().subscribe((data) => {
      console.log('Retrieved Credit Card Years : ' + JSON.stringify(data));
      this.creditCardYears = data;
    });
  }

  listCartDetails() {
    // get a handle to the cart items
    this.cartItems = this.cartService.cartItem;

    // subscribe to the cart totalprice
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));

    // subscribe to the cart totalQty
    this.cartService.totalQty.subscribe((data) => (this.totalQty = data));

    // compute cart total price and quantity
    this.cartService.computeCartTotals();
  }
  onSubmit() {
    console.log('handling the submit button');
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log(this.checkoutFormGroup.get('shippingaddress').value);
    console.log(this.checkoutFormGroup.get('billingaddress').value);
    console.log(this.checkoutFormGroup.get('payment').value);
  }
}
