import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
 
import { CartItem } from '../entitys/cart-item';
import Swal from 'sweetalert2'
import { ok } from 'assert';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItem: CartItem[] = [];

  // subject is a sub class of observable we can use Subject to publish event in our code the event will be sent
  // to all of the subscribers

  totalPrice: Subject<number> = new Subject<number>();
  totalQty: Subject<number> = new Subject<number>();
  
  constructor() { }

  addToCart(myCartItem:CartItem) {
    // check if already have the item in cart or not 
    let alreadyExistingInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    // if something is already present in the cart means cart length > 0
    if (this.cartItem.length > 0) {
       // then iterate to all cartItem array and check the item which user added to cart and the item 
       // which already present in cart if this is the case store that cart item in new variable
      for (let tempCartItem of this.cartItem) {
        if (tempCartItem.id === myCartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }
      }

      alreadyExistingInCart = (existingCartItem != undefined) // if existingCartItem has any item then it is not equal to 
                                                              // undefined so it store true in alreadyExisitngInCarts
    }

    if (alreadyExistingInCart) {
      // increment the qty of already exiting item in cart
      existingCartItem.quantity++;
    }
    else {
      // if item already not exist simply add that item into cartItem array
      this.cartItem.push(myCartItem);
    }
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `${myCartItem.name}  ADDED TO CART`,
      showConfirmButton: true,
      timer: 1500
    })
    // compute total price and total quantity
  this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQtyValue: number = 0;
    
    for (let allItem of this.cartItem) {
      totalPriceValue += allItem.unitPrice * allItem.quantity;
      totalQtyValue += allItem.quantity;
    }
    // publish the new values all subscribers will recieve it
    this.totalPrice.next(totalPriceValue);
    this.totalQty.next(totalQtyValue);
    // next method will publish and send event to all subsctibers to change the values
    // one event to change totalPrice
    // one event to change totalQty

    // logging cart data just for debugging purpose  
    this.logCartData(totalPriceValue, totalQtyValue);


    
  }

  logCartData(totalPriceValue: number, totalQtyValue: number) {
    console.log("CONTENT OF THE CARTS")
    for (let logData of this.cartItem) {
      const subTotalPrice = logData.quantity * logData.unitPrice;
      console.log("name = " + logData.name);
      console.log("quantity = " + logData.quantity);
      console.log("unitPrice = " + logData.unitPrice);
      console.log("subTotalPrice = " + subTotalPrice);
    }
     
    console.log("total price = " + (Math.round(totalPriceValue).toFixed(2)) + " total qty = " + totalQtyValue);
    console.log("---------")
  }




}
