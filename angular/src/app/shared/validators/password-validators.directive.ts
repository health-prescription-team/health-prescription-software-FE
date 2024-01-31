import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, ValidationErrors, Validators } from '@angular/forms';

@Directive({
  selector: '[appPasswordMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordMatchValidatorDirective,
      multi: true
    }
  ]
})
export class PasswordMatchValidatorDirective {
  validate(control: AbstractControl): ValidationErrors | null {
    const password = control.get('Password');
    const rePassword = control.get('ConfirmPassword');

    if (password && rePassword && password.value !== rePassword.value) {

      return { passwordMatch: true };
    }

    return null;
  }
}
