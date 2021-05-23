import { Component, OnInit } from '@angular/core';
import { Product } from '../../entitys/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private productService: ProductService
           , private router : ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(() => {
      this.handleProducts();
    })
  }

  handleProducts() {
    // get the id and convert "id" param string to number using +
    const productId: number = +this.router.snapshot.paramMap.get("id");
    console.log("PROD ID  = " + productId);
    this.productService.getProductByProductId(productId).subscribe((
      data => {
        this.product = data;
      }
    ));
  }

}
