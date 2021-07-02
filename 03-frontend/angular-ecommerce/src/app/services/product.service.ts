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
 
  


  private productUrl = 'http://localhost:8081/api/products';
  private categoryUrl = 'http://localhost:8081/api/product-category';


  constructor(private httpClient: HttpClient) { }

  // getting product list and storing it into products array
  getProductListByCategoryIdPaginate(catId:number): Observable<Product[]> {

    // build URL based on category id
    const searchUrl = `${this.productUrl}/search/findByCategoryId?id=${catId}`;
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
    const searchKeywordUrl = `${this.productUrl}/search/findByNameContaining?productname=${keyword}`;
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

  // pagination method when item searched on id based
  getProductListPagination(page:number , pageSize : number , catId : number): Observable<GetResponseProducts> {

    // build URL based on category id using pagination
    const searchUrl = `${this.productUrl}/search/findByCategoryId?id=${catId}`
      + `&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

    // pagination method
    searchProductPagination(page:number , pageSize : number , catKeyword : string): Observable<GetResponseProducts> {

      // build URL based on category id using pagination
      const searchUrl = `${this.productUrl}/search/findByNameContaining?product_name=${catKeyword}`
        + `&page=${page}&size=${pageSize}`;
      return this.httpClient.get<GetResponseProducts>(searchUrl);
    }
  
}



interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number, // size of the page
    totalElements: number,
    totalPages: number, // total pages
    number: number // current page
  }
}

// unwraps the json from spring data rest _embedded entry
interface GetResponseProductsCategories {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
