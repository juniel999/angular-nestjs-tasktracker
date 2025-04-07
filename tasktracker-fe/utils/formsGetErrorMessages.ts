import { AbstractControl } from '@angular/forms';

// This is a utility function that returns the error message for a specific form control
export function formsGetErrorMessages(control: AbstractControl | null): string {
  if (!control) return 'Invalid input.';

  if (control.hasError('required')) {
    return 'This field is required.';
  }
  if (control.hasError('minlength')) {
    return `Minimum length should be ${control.errors?.['minlength'].requiredLength} characters.`;
  }
  if (control.hasError('maxlength')) {
    return `Maximum length exceeded.`;
  }
  if (control.hasError('email')) {
    return 'Invalid email format.';
  }
  if (control.hasError('passwordMismatch')) {
    return 'Passwords do not match.';
  }

  return 'Invalid input.';
}
