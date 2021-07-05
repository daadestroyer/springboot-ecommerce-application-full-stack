import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../entitys/product-category';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-category-dropdown',
  templateUrl: './product-category-dropdown.component.html',
  styleUrls: ['./product-category-dropdown.component.css']
})
export class ProductCategoryDropdownComponent implements OnInit {

  productCategory: ProductCategory[];
  constructor(private productService : ProductService) { }

  ngOnInit() {
    this.listProductCategores() 
  }
  listProductCategores() {
    this.productService.getProductCategories().subscribe(
      data => {
        // console.log("Product Categories = " + JSON.stringify(data));
        this.productCategory = data;
      }
    );

    // console.log(this.productCategory);
  }

}
