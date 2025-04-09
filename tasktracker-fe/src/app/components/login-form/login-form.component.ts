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
import { formsGetErrorMessages } from '../../../../utils/formsGetErrorMessages';
import { lucideTriangleAlert } from '@ng-icons/lucide';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
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
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  constructor(private authService: AuthService, private router: Router) {}

  errorMessage = '';

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
  });

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;
    this.authService.loginUser(username ?? '', password ?? '').subscribe({
      next: (res) => {
        console.log('User logged in:', res);
        localStorage.setItem('access_token', res.access_token); // Store access token in local storage
        localStorage.setItem('username', res.username);
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        // Backend should return error message here
        console.error('Login error:', err);
        this.errorMessage = err?.error?.message || 'Something went wrong!';
        console.log('Error message:', this.errorMessage);
      },
    });
  }

  getErrorMessage(field: string): string {
    return formsGetErrorMessages(this.loginForm.get(field));
  }
}
