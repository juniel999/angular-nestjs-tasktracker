import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { hlmH1 } from '@spartan-ng/ui-typography-helm';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [HlmButtonDirective, RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private router: Router) {}

  localStorage = localStorage;
  hlmH1 = hlmH1;

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}
