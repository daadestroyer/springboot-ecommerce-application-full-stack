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
}
