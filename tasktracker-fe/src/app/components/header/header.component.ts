import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { hlmH1 } from '@spartan-ng/ui-typography-helm';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [HlmButtonDirective, RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  hlmH1 = hlmH1;
  hlmButton = HlmButtonDirective;
}
