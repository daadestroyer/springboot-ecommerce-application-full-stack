import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule, Router } from '@angular/router';
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
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import{ OKTA_CONFIG , OktaAuthModule , OktaCallbackComponent, OktaAuthGuard}from '@okta/okta-angular';

import myAppConfig from './config/my-app-config';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderHistory } from './entitys/order-history';
import { AuthInterceptorService } from './services/auth-interceptor.service';

const oktaConfig = Object.assign({
  onAuthRequired:(oktaAuth, injector)=>{
    const router = injector.get(Router);

    // redirect the user to your custom login page
    router.navigate(['/login']);
  }
},myAppConfig.oidc);



const appRoutes: Routes = [
  
  // if autheicated , give access to route else , send to login page
  {path: 'order-history', component: OrderHistoryComponent, canActivate: [ OktaAuthGuard ]},
  {path: 'members', component: MembersPageComponent, canActivate: [ OktaAuthGuard ]},


  // once user is autheicated they are redirected to your app using oktaCallbackComponent
  // normally you need to parse the response and store the OAuth + OIDC tokens
  // the okta OktaCallbackComponent does this for you
  {path:'login/callback',component:OktaCallbackComponent},
  {path:'login',component:LoginComponent},
  {path:'',component:HomeComponent},
  {path:'contact',component:ContactComponent},

  {path:'products',component:ProductListComponent},
  {path:'category',component:ProductListComponent},
  { path: 'category/:id', component: ProductListComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  
  { path: 'product-detail/:id', component: ProductDetailsComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'checkout', component: CheckoutComponent },
  
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
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    MembersPageComponent,
    OrderHistoryComponent,
    
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ProductService, { provide: OKTA_CONFIG, useValue: oktaConfig },
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }