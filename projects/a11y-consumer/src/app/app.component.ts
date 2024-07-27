import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { FocusTrapDirective } from '../../../ngx-angular-a11y/src/lib/focus-trap.directive';
import { KeyboardShortcutsService } from '../../../ngx-angular-a11y/src/lib/keyboard-shortcuts.service';
import { AriaRoleDirective } from '../../../ngx-angular-a11y/src/lib/ariarole.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    TaskListComponent,
    FocusTrapDirective,
    AriaRoleDirective,
  ],
  providers: [KeyboardShortcutsService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'a11yConsumer';
  keyboardShortcutsService = inject(KeyboardShortcutsService);

  ngOnInit() {
    this.keyboardShortcutsService.bindKeydownListener();

    this.keyboardShortcutsService.registerShortcut('3', () =>
      this.focusElement('main-content'),
    );
    this.keyboardShortcutsService.registerShortcut('1', () =>
      this.focusElement('header'),
    );
    this.keyboardShortcutsService.registerShortcut('4', () =>
      this.focusElement('footer'),
    );
    this.keyboardShortcutsService.registerShortcut('2', () =>
      this.focusElement('aside'),
    );
  }

  private focusElement(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.focus();
    }
  }
}
