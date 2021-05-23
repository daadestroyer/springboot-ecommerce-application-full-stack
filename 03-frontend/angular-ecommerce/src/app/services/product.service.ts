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
  getProductListByCategoryId(catId:number): Observable<Product[]> {

    // build URL based on category id
    const searchUrl = `${this.productUrl}/search/findProductByCategoryId?id=${catId}`;
    return this.getProductList(searchUrl);
  }

  // this method is used to display all categores in navigation bar dropdown
  getProductCategories() : Observable<ProductCategory[]> {
    // return an observable maps the JSON data from spring data rest to ProductCategory array
     return this.httpClient.get<GetResponseProductsCategories>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProducts(keyword: string): Observable<Product[]> {
    
    // build URL based on keyword
    const searchKeywordUrl = `${this.productUrl}/search/findByNameContaining?product_name=${keyword}`;
    return this.getProductList(searchKeywordUrl);
  }

  private getProductList(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductByProductId(productId: number) : Observable<Product>{
    // need to build url based on prodct id
    const productUrl = `${this.productUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl);
    // returning single product
  }
}


class GetResponseProducts {
  _embedded: {
    products: Product[];
  }
}

// unwraps the json from spring data rest _embedded entry
class GetResponseProductsCategories {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
