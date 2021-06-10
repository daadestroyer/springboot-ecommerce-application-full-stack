import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartItem } from '../../entitys/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
 
  checkoutFormGroup: FormGroup;
  cartItems: CartItem[] = [];
  totalPrice = 0;
   
  totalQty = 0;

  constructor(private formBuilder: FormBuilder,
  private cartService:CartService) { }

  ngOnInit(): void {
    this.listCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email:['']
      }),
      shippingaddress: this.formBuilder.group({
        addr1 : [''],
        addr2 : [''],
        country : [''],
        state : [''],
        zip : [''],
      }),
      billingaddress: this.formBuilder.group({
        addr1 : [''],
        addr2 : [''],
        country : [''],
        state : [''],
        zip : [''],
      }),
      payment: this.formBuilder.group({
        cardtype : [''],
        nameoncard : [''],
        cardnumber : [''],
        expiration : [''],
        cvv : [''],
      })
    });
    
  }
  listCartDetails() {
    // get a handle to the cart items
   this.cartItems = this.cartService.cartItem;

   // subscribe to the cart totalprice
   this.cartService.totalPrice.subscribe(
     (data) => this.totalPrice = data
   );

   // subscribe to the cart totalQty
   this.cartService.totalQty.subscribe(
     (data) => this.totalQty = data
   );


   // compute cart total price and quantity
   this.cartService.computeCartTotals();
   
    
 }
  onSubmit() {
    console.log("handling the submit button");
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log(this.checkoutFormGroup.get('shippingaddress').value);
    console.log(this.checkoutFormGroup.get('billingaddress').value);
    console.log(this.checkoutFormGroup.get('payment').value);
  }

}
