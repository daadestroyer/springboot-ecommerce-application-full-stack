import { FormControl, ValidationErrors } from '@angular/forms';

export class CheckoutValidators {
  // whitespaces validation
  static checkWhiteSpace(control: FormControl): ValidationErrors {
    // check is string contains whitespaces or not
    if (control.value != null && control.value.trim().length === 0) {
      // invalid , return object
      return { checkWhiteSpace: true };
    } else {
      return null;
    }
  }
  //  zip code is number or not
  static checkZip(control: FormControl): ValidationErrors {
    // check is string contains whitespaces or not
    if (isNaN(control.value)) {
      console.log("not a number");
      // invalid , return object
      return { checkZip: true };
    } else {
      console.log("is a number");
      return null;
    }
  }

  //  cvv code is number or not
  static checkCVV(control: FormControl): ValidationErrors {
    // check is string contains whitespaces or not
    if (isNaN(control.value)) {
      console.log("not a number");
      // invalid , return object
      return { checkCVV: true };
    } else {
      console.log("is a number");
      return null;
    }
  }


}
