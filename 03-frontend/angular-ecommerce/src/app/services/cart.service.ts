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
  
  // storage: Storage = sessionStorage; // this is for session storage
     storage : Storage = localStorage; // this is for local storage

     
  // subject is a sub class of observable we can use Subject to publish event in our code the event will be sent
  // to all of the subscribers

  totalPrice: Subject<number> = new Subject<number>();
  totalQty: Subject<number> = new Subject<number>();
  
  constructor() {
    // read the data from the storage
    let data = JSON.parse(this.storage.getItem('cartItem'));

    if(data!=null){
      this.cartItem =  data;

      // compute the total based on the data is read from storage
      this.computeCartTotals();
    }

   }

 

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

    // persist cart data
    this.persistCartItems();
  }

  persistCartItems(){
    // this.cartItem is value and we take that value to JSON.stringify convert object to JSON string
    // cartItem is key
    this.storage.setItem('cartItem',JSON.stringify(this.cartItem));
    console.log(this.storage.getItem('cartItems'));
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

  decrementQty(cartItem: CartItem) {
    
    // in case if 1 item is only present in cart and user want to delete that item also then in that case
    // we need to clear the cart (simply delete that object from the array)
    
    cartItem.quantity--;
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `${cartItem.name}  Removed from your cart`,
      showConfirmButton: true,
      timer: 1500
    })
    if (cartItem.quantity === 0) {
      this.remove(cartItem);
    }
    else {
      this.computeCartTotals();
      
    }
  }
  remove(cartItem: CartItem) {
    
    const itemIndex = this.cartItem.findIndex(
      (tempCartItem) => tempCartItem.id == cartItem.id
    );

    // if found , remove the item from the array at the given index
    if (itemIndex > -1) {
      this.cartItem.splice(itemIndex, 1);
      this.computeCartTotals();
    }
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: "You won't be able to revert this!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, delete it!'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire(
    //       'Deleted!',
    //       'Your file has been deleted.',
    //       'success'
    //     )
    //   }
    // })
  }


}
