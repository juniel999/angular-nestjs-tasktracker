import { Component } from '@angular/core';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import {
  HlmAlertDescriptionDirective,
  HlmAlertDirective,
  HlmAlertIconDirective,
} from '@spartan-ng/ui-alert-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { formsPasswordsMatchValidator } from '../../../../utils/formsPasswordMatchValidator';
import { formsGetErrorMessages } from '../../../../utils/formsGetErrorMessages';
import { lucideTriangleAlert } from '@ng-icons/lucide';

@Component({
  selector: 'app-register-form',
  imports: [
    HlmCardDirective,
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmInputDirective,
    HlmButtonDirective,
    ReactiveFormsModule,
    HlmAlertDirective,
    HlmAlertDescriptionDirective,
    HlmAlertIconDirective,
    HlmIconDirective,
    NgIcon,
  ],
  providers: [provideIcons({ lucideTriangleAlert })],
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  constructor(private registerService: RegisterService) {}

  errorMessage = '';

  registerForm = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: formsPasswordsMatchValidator,
    }
  );

  onSubmit() {
    if (this.registerForm.invalid) return;

    const { username, name, email, password } = this.registerForm.value;

    this.registerService
      .registerUser(username ?? '', name ?? '', email ?? '', password ?? '')
      .subscribe({
        next: (res) => {
          console.log('User registered:', res);
        },
        error: (err) => {
          // Backend should return error message here
          console.error('Registration error:', err);

          // You can access error message like this (depends on how your backend returns it)
          this.errorMessage = err?.error?.message || 'Something went wrong!';
          console.log('Error message:', this.errorMessage);
        },
      });
  }

  getErrorMessage(field: string): string {
    return formsGetErrorMessages(this.registerForm.get(field));
  }
}
