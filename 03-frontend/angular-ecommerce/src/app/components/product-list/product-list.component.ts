import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/entitys/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../entitys/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  currentCategoryId: number;
  previousCatId: number;
  searchMode: boolean;
  searchkeyword: string;

  // new properties for pagination
  thePageNumber : number = 1;
  thePageSize : number = 8; // at a time how many pages you want to display
  theTotalElements: number = 0;

  prevKeyword: string = null;
  
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  // this method will work when user want to search products using search bar
  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword');
    this.searchkeyword = keyword;
   
   // if we have a different keyword than previous one
   // then set thePageNumber to 1 
   
    if (this.prevKeyword != keyword) {
      this.thePageNumber = 1;
    }

    this.prevKeyword = keyword;


    console.log(keyword);
    this.productService.searchProductPagination(this.thePageNumber - 1,
                                                this.thePageSize,
                                                keyword).subscribe(this.processResult());
  }
// this method will work when user want to find product based on category id using dropdown
  handleListProducts() {
    const id = this.route.snapshot.params['id'];
    console.log('ID = ' + id);
    if (id == undefined) {
      this.currentCategoryId = 1;
    } else {
      this.currentCategoryId = id;
    }
    //
    // check if we have a differnt category then previous
    // angular will reuse the component if it is currently being viewed
    //
    // if we have a different category if then previous  
    // then set the page number  back to 1

    if (this.previousCatId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCatId = this.currentCategoryId;
    console.log(`current category id : =  ${this.currentCategoryId} , pageNumber = ${this.thePageNumber} `);

    this.productService.getProductListPagination(this.thePageNumber-1,this.thePageSize,this.currentCategoryId).subscribe(this.processResult());
    
  }


  processResult() {
    return data => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;            // current page
      this.thePageSize = data.page.size;                    // total page
      this.theTotalElements = data.page.totalElements;      // total elements
    }
  }

  updatePageSize(pageSize: number) {
    
    console.log("PAGE SIZE = " + pageSize);
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  processCart(cartProduct:Product) {
    console.log("PROD NAME = "+cartProduct.name);
    console.log("PROD PRICE = " + cartProduct.unitPrice);

    const cartItem = new CartItem(cartProduct);
    this.cartService.addToCart(cartItem);
    
  }
}