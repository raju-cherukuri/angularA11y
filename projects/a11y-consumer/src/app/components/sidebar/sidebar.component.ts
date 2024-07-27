import { Component } from '@angular/core';
import { FocusTrapDirective } from '../../../../../ngx-angular-a11y/src/lib/focus-trap.directive';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FocusTrapDirective],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {}
