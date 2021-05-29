import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { ProductCategoryDropdownComponent } from './components/product-category-dropdown/product-category-dropdown.component';
import {SearchComponent} from "./components/search/search.component";
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { FilterpanelComponent } from './components/filterpanel/filterpanel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { FooterComponent } from './components/footer/footer.component';


const appRoutes: Routes = [
  {path:'',component:HomeComponent},
  {path:'contact',component:ContactComponent},
  {path:'products',component:ProductListComponent},
  {path:'category',component:ProductListComponent},
  { path: 'category/:id', component: ProductListComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'product-detail/:id', component: ProductDetailsComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  {path:'**',component:ErrorComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    HomeComponent,
    ContactComponent,
    ErrorComponent,
    ProductCategoryDropdownComponent,
    SearchComponent,
    ProductDetailsComponent,
    FilterpanelComponent,
    CartStatusComponent,
    CartDetailsComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
