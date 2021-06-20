import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CartItem } from '../../entitys/cart-item';
import { CartService } from '../../services/cart.service';
import { CheckoutFormService } from '../../services/checkout-form.service';
import { Country } from '../../entitys/country';
import { State } from '../../entitys/state';
import { CheckoutValidators } from './checkout-validators';

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

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  countries: Country[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private checkOutFormService: CheckoutFormService
  ) {}

  ngOnInit(): void {
    this.listCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CheckoutValidators.checkWhiteSpace,
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CheckoutValidators.checkWhiteSpace,
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9,_%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          CheckoutValidators.checkWhiteSpace,
        ]),
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

    // populate countries
    this.checkOutFormService
      .getCountries()
      .subscribe((data) => (this.countries = data));
  }
  //getter setter methods for validation
  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }
  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }
  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('payment');
    const currentYear = new Date().getFullYear();
    const selectedYear = Number(creditCardFormGroup.value.expirationyear);

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.checkOutFormService
      .getCreditCardMonths(startMonth)
      .subscribe((data) => {
        this.creditCardMonths = data;
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
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
    console.log('handling the submit button');
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log(this.checkoutFormGroup.get('shippingaddress').value);
    console.log(this.checkoutFormGroup.get('billingaddress').value);
    console.log(this.checkoutFormGroup.get('payment').value);
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    this.checkOutFormService.getStates(countryCode).subscribe((data) => {
      if (formGroupName === 'billingaddress') {
        this.billingAddressStates = data;
      } else {
        this.shippingAddressStates = data;
      }
    });
  }

  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      // billingaddress me sari values set kardo shipping address ki
      this.checkoutFormGroup.controls.billingaddress.setValue(
        this.checkoutFormGroup.controls.shippingaddress.value
      );

      // bug fix for states
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls.billingaddress.reset();

      // bug fix for states
      this.billingAddressStates = [];
    }
  }
}
