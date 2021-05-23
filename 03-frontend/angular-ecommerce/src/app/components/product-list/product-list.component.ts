import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/entitys/product';
import { ActivatedRoute } from '@angular/router';

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
  thePageSize : number = 10;
  theTotalElements: number = 0;
  
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
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
    console.log(keyword);
    this.productService.searchProducts(this.searchkeyword).subscribe(
      (data) => {
        this.products = data;
      }); 
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

    this.productService
      .getProductListByCategoryId(this.currentCategoryId)
      .subscribe((data) => {
        this.products = data;
      });
  }
}
