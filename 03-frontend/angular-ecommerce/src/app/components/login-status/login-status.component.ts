import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated : boolean = false;
  userFullName : string;

  // reference to web browser session Storage
  storage : Storage = sessionStorage;
  constructor(private oktaAuthService:OktaAuthService) { }

  ngOnInit(): void {
    // subscribe to authentication state changes
    this.oktaAuthService.$authenticationState.subscribe(
      (result) => {
        this.isAuthenticated=result;
        this.getUserDetails();
      }
    );
  }
  getUserDetails() {
   if(this.isAuthenticated){
     // fetched the logged in user details (user's claims)
     //
     // user full name is exposed as a property name
     this.oktaAuthService.getUser().then(
       (res)=>{
         this.userFullName = res.name;

         // retrieve the user email from authentication response
         const userEmail = res.email;

        // now store user email in broswer Storage
        // set 1st paramter contain key and 2nd parameter contain value
        this.storage.set('userEmail',JSON.stringify(userEmail));
       }
     );
   }

  }

  logout() {
    // terminate the session with Okta and removes current tokens
    this.oktaAuthService.signOut();
  }
}
