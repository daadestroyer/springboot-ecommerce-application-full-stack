import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../entitys/cart-item';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {


  cartItems: CartItem[] = [];
  totalPrice = 0;
   
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
    
     
  }
  
  incrementQty(cartIitem: CartItem) {
    this.cartService.addToCart(cartIitem);
  }

  decrementQty(cartItem: CartItem) {
   
    this.cartService.decrementQty(cartItem);
  }

  removeItem(item: CartItem) {
        Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your item has been deleted.',
          'success'
        );
        this.cartService.remove(item);
      }
      else {
        
       
      }
    })

    
  }
}
