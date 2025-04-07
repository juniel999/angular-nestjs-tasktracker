import { AbstractControl, ValidationErrors } from '@angular/forms';

// This is a custom validator function that checks if the password and confirmPassword fields match
export function formsPasswordsMatchValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
}
