import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../entitys/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {


  cartItems: CartItem[] = [];
  totalPrice = 0;
  finalPrice = 0;
  shippingPrice = 100;
  totalQty = 0;

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.listCartDetails()
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
    
    if (this.totalPrice > 0) {
      this.finalPrice = this.totalPrice+this.shippingPrice;
    }
  }

}
