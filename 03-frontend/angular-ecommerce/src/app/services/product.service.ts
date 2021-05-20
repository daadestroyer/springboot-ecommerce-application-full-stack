import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../entitys/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../entitys/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  private productUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';


  constructor(private httpClient: HttpClient) { }

  // getting product list and storing it into products array
  getProductListByProductId(catId:number): Observable<Product[]> {
    
    // build URL based on category id
    const searchUrl = `${this.productUrl}/search/findProductByCategoryId?id=${catId}`;

    
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );  
  }


  getProductCategories() : Observable<ProductCategory[]> {
    // return an observable maps the JSON data from spring data rest to ProductCategory array
    return this.httpClient.get<GetResponseProductsCategories>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    ); 
  }
}
  
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
}

// unwraps the json from spring data rest _embedded entry
interface GetResponseProductsCategories {
  _embedded: {
    productCategory: ProductCategory[];
  }
}