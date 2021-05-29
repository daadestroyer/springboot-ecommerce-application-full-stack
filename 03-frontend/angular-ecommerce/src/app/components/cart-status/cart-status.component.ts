import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice: number = 0.0;
  totalQty: number = 0;
  constructor(private cartServce:CartService) { }

  ngOnInit(): void {
    this.updateCartStatus()
  }
  updateCartStatus() {
     // subscribe to the cart totalPrice
    this.cartServce.totalPrice.subscribe(
      (data) => this.totalPrice = data
    );

     // subscribe to the cart totalQty
    this.cartServce.totalQty.subscribe(
      (data) => this.totalQty = data
    );
  }

}
