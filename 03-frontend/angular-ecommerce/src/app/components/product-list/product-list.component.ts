import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/entitys/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number;

  constructor(private productService: ProductService,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() =>{
      this.listProducts();
    });
  }

  listProducts() {

    const id = this.route.snapshot.params['id'];
    console.log("ID = " + id);
    if (id == undefined) {
      this.currentCategoryId = 1;
    }
    else {
      this.currentCategoryId = id;
    }
    this.productService.getProductListByProductId(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
    
  
  }

}
