import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  searchProduct(){
    console.log('search button work')
  }
  doMyCustomerWork(value:string){
    console.log('this is your data ${value}');
  }
}
