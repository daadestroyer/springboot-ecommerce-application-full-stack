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
import Swal from 'sweetalert2';
import { Order } from 'src/app/entitys/order';
import { OrderItem } from 'src/app/entitys/order-item';
import { Purchase } from 'src/app/entitys/purchase';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  storage: Storage = sessionStorage;

  checkoutFormGroup: FormGroup;
  cartItems: CartItem[] = [];
  totalPrice = 0;

  totalQuantity = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  countries: Country[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private checkOutFormService: CheckoutFormService,
    private checkoutService: CheckoutService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listCartDetails();

    // read user email address from browser storage
    const theEmail = JSON.parse(this.storage.getItem('userEmail'));
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
        email: new FormControl(theEmail, [
          Validators.required,
          Validators.pattern('^[a-z0-9,_%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          CheckoutValidators.checkWhiteSpace,
        ]),
      }),
      shippingaddress: this.formBuilder.group({
        addr1: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          CheckoutValidators.checkWhiteSpace,
        ]),
        addr2: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CheckoutValidators.checkWhiteSpace,
        ]),
        country: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        zip: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          CheckoutValidators.checkWhiteSpace,
          CheckoutValidators.checkZip,
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CheckoutValidators.checkWhiteSpace,
        ]),

      }),
      billingaddress: this.formBuilder.group({
        addr1: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          CheckoutValidators.checkWhiteSpace,
        ]),
        addr2: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CheckoutValidators.checkWhiteSpace,
        ]),
        country: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        zip: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          CheckoutValidators.checkWhiteSpace,
          CheckoutValidators.checkZip,
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CheckoutValidators.checkWhiteSpace,
        ]),
      }),
      payment: this.formBuilder.group({
        cardtype: new FormControl('', [Validators.required]),
        nameoncard: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        cardnumber: [''],
        expirationmonth: [''],
        expirationyear: [''],
        cvv: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(3),
          CheckoutValidators.checkWhiteSpace,
          CheckoutValidators.checkCVV,
        ]),
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
  //getter setter methods to get data from user and for further processing
  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }


  get shippingaddressaddr1() {
    return this.checkoutFormGroup.get('shippingaddress.addr1');
  }
  get shippingaddressaddr2() {
    return this.checkoutFormGroup.get('shippingaddress.addr2');
  }
  get shippingaddresscountry() {
    return this.checkoutFormGroup.get('shippingaddress.country');
  }
  get shippingaddressstate() {
    return this.checkoutFormGroup.get('shippingaddress.state');
  }
  get shippingaddresszip() {
    return this.checkoutFormGroup.get('shippingaddress.zip');
  }
  get shippingaddresscity() {
    return this.checkoutFormGroup.get('shippingaddress.city');
  }
  // for billingaddress
  get billingaddressfirstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }
  get billingaddresslastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }
  get billingaddressemail() {
    return this.checkoutFormGroup.get('customer.email');
  }
  get billingaddr1() {
    return this.checkoutFormGroup.get('billingaddress.addr1');
  }
  get billingaddr2() {
    return this.checkoutFormGroup.get('billingaddress.addr2');
  }
  get billingaddresscountry() {
    return this.checkoutFormGroup.get('billingaddress.country');
  }
  get billingaddressstate() {
    return this.checkoutFormGroup.get('billingaddress.state');
  }
  get billingaddresszip() {
    return this.checkoutFormGroup.get('billingaddress.zip');
  }
  get billingaddresscity() {
    return this.checkoutFormGroup.get('billingaddress.city');
  }

  // for payment
  get paymentType() {
    return this.checkoutFormGroup.get('payment.cardtype');
  }
  get nameOnCard() {
    return this.checkoutFormGroup.get('payment.nameoncard');
  }
  get cardNumber() {
    return this.checkoutFormGroup.get('payment.cardnumber');
  }
  get expirationMonth() {
    return this.checkoutFormGroup.get('payment.expirationmonth');
  }
  get expirationYear() {
    return this.checkoutFormGroup.get('payment.expirationyear');
  }
  get cvv() {
    return this.checkoutFormGroup.get('payment.cvv');
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
    this.cartService.totalQty.subscribe((data) => (this.totalQuantity = data));

    // compute cart total price and quantity
    this.cartService.computeCartTotals();
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


  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Oops...',
      //   text: 'Something went wrong!',
      //   footer: '<a href="">Why do I have this issue?</a>',
      // });
    }
    console.log('handling the submit button');
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log(this.checkoutFormGroup.get('shippingaddress').value);
    console.log(this.checkoutFormGroup.get('billingaddress').value);
    console.log(this.checkoutFormGroup.get('payment').value);

    // set up orders
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.cartItem;

    // create orderItems from cartItems
    // - long way
    /*
    let orderItems: OrderItem[] = [];
    for (let i=0; i < cartItems.length; i++) {
      orderItems[i] = new OrderItem(cartItems[i]);
    }
    */

    // - short way of doing the same thingy
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));
    console.log("Order Items = " + orderItems);

    // set up purchase
    let purchase = new Purchase();

    // populate purchase - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    // populate purchase - shipping address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingaddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;

    // populate purchase - billing address
    purchase.billingAddress = this.checkoutFormGroup.controls['billingaddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;

    // populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    // call REST API via the CheckoutService
    this.checkoutService.placeOrder(purchase).subscribe({
      next: response => {
        alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);
        Swal.fire(
          "Hurray",
          "You're order placed successfully",
          "success",
        )
        // reset cart
        this.resetCart();

      },
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    }
    );
  }
  resetCart() {
    // reset cart data
    this.cartService.cartItem = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQty.next(0);

    // reset the form
    this.checkoutFormGroup.reset();

    // navigate back to the products page
    this.router.navigateByUrl("/products");
  }
}