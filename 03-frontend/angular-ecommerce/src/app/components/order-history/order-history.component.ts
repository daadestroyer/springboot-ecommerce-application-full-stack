import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/entitys/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orderHistoryList : OrderHistory[] = [];
  storage:Storage=sessionStorage;
  
  constructor(private orderHistorryService : OrderHistoryService) { }

  ngOnInit(): void {
    this.handleOrderHistory();
  }

  handleOrderHistory() {
     // get the user email address from the session storage
     const theEmail = JSON.parse(this.storage.getItem('userEmail'))

     // retrieve data from this user give email address using OrderHistory service class
    this.orderHistorryService.getOrderHistory(theEmail).subscribe(
      (data)=>{
        this.orderHistoryList = data._embedded.orders;
      }
    );



  }

}
