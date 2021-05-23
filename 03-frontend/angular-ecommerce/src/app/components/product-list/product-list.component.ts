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
  searchMode: boolean;
  searchkeyword: string;

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

  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword');
    this.searchkeyword = keyword;
    console.log(keyword);
    this.productService.searchProducts(this.searchkeyword).subscribe(
      (data) => {
        this.products = data;
      }); 
  }

  handleListProducts() {
    const id = this.route.snapshot.params['id'];
    console.log('ID = ' + id);
    if (id == undefined) {
      this.currentCategoryId = 1;
    } else {
      this.currentCategoryId = id;
    }
    this.productService
      .getProductListByProductId(this.currentCategoryId)
      .subscribe((data) => {
        this.products = data;
      });
  }
}
