# ngx-angular-a11y

The Angular Accessibility Library provides a set of directives and services to enhance the accessibility of your Angular applications. This library includes utilities for managing ARIA properties, roles, focus, and live regions, making it easier to create accessible web applications.

![Static Badge](https://img.shields.io/badge/build-passing-brightgreen)

## Usage

### 1. Install

```bash
npm install ngx-angular-a11y --save
```

### 2. Service/Directive Integration

Integrate the services and directives into your Angular application:

#### AriaPropertyDirective
The AriaPropertyDirective sets an ARIA property and its value on an element.

```typescript
import { Directive, Input, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[ariaProperty]',
})
export class AriaPropertyDirective implements OnInit {
  @Input('ariaProperty') property: string = '';
  @Input('ariaValue') value: string = '';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    if (this.property && this.value) {
      this.renderer.setAttribute(
        this.el.nativeElement,
        this.property,
        this.value,
      );
    }
  }
}
```
#### AriaRoleDirective
The AriaRoleDirective sets the role attribute on an HTML element.

```typescript
import { Directive, Input, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[ariaRole]',
})
export class AriaRoleDirective implements OnInit {
  @Input('ariaRole') role: string = '';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.renderer.setAttribute(this.el.nativeElement, 'role', this.role);
  }
}

```

#### FocusService
The FocusService manages focus within your application.

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FocusService {
  private previousFocus: HTMLElement | null = null;

  saveFocus() {
    this.previousFocus = document.activeElement as HTMLElement;
  }

  restoreFocus() {
    if (this.previousFocus) {
      try {
        this.previousFocus.focus();
      } catch (error) {
        console.error('Failed to restore focus:', error);
      }
    }
  }
}
```

#### FocusTrapDirective
The FocusTrapDirective traps focus within a specified element.

```typescript
import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[focusTrap]',
  standalone: true,
})
export class FocusTrapDirective implements OnInit {
  private focusableElements: HTMLElement[] = [];
  @HostBinding('class.focused') isFocused = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.focusableElements = this.getFocusableElements();
  }

  @HostListener('focusin')
  onFocusIn() {
    this.isFocused = true;
  }

  @HostListener('focusout')
  onFocusOut() {
    this.isFocused = false;
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  }

  private getFocusableElements(): HTMLElement[] {
    const focusableSelectors = [
      'a[href]',
      'button',
      'textarea',
      'input[type="text"]',
      'input[type="radio"]',
      'input[type="checkbox"]',
      'select',
      '[tabindex]:not([tabindex="-1"])',
      'label[tabindex]',
      'h1[tabindex]',
      'h2[tabindex]',
      'h3[tabindex]',
      'h4[tabindex]',
      'h5[tabindex]',
      'h6[tabindex]',
      'li[tabindex]',
      'ul[tabindex]',
    ];

    const elements = this.el.nativeElement.querySelectorAll(
      focusableSelectors.join(','),
    );
    return Array.from(elements) as HTMLElement[];
  }

  private trapFocus(event: KeyboardEvent) {
    const firstElement = this.focusableElements[0];
    const lastElement =
      this.focusableElements[this.focusableElements.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  }

  public focusFirstElement() {
    if (this.focusableElements.length) {
      this.focusableElements[0].focus();
    }
  }
}
```

#### KeyboardShortcutsService
The KeyboardShortcutsService manages keyboard shortcuts in your application.

```typescript
import {
  Injectable,
  HostListener,
  RendererFactory2,
  Renderer2,
} from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeyboardShortcutsService {
  private shortcuts: { [key: string]: () => void } = {};
  private keydownSubject = new Subject<KeyboardEvent>();
  private keydownListener: (() => void) | undefined;
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.keydownSubject.pipe(debounceTime(100)).subscribe((event) => {
      if (this.shortcuts[event.key]) {
        try {
          this.shortcutsevent.key;
        } catch (error) {
          console.error(`Error executing shortcut for key ${event.key}:`, error);
        }
      }
    });
  }

  registerShortcut(key: string, callback: () => void) {
    this.shortcuts[key] = callback;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.keydownSubject.next(event);
  }

  bindKeydownListener() {
    this.keydownListener = this.renderer.listen(
      'window',
      'keydown',
      (event: KeyboardEvent) => {
        this.keydownSubject.next(event);
      },
    );
  }

  unbindKeydownListener() {
    if (this.keydownListener) {
      this.keydownListener();
    }
  }
}

```

#### LiveAnnouncerService
The LiveAnnouncerService announces messages to users for accessibility purposes.

```typescript
import { Injectable } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Injectable({
  providedIn: 'root',
})
export class LiveAnnouncerService {
  constructor(private liveAnnouncer: LiveAnnouncer) {}

  announcePolite(message: string): void {
    if (message) {
      try {
        this.liveAnnouncer.announce(message, 'polite');
      } catch (error) {
        console.error('Error announcing polite message:', error);
      }
    }
  }

  announceAssertive(message: string): void {
    if (message) {
      try {
        this.liveAnnouncer.announce(message, 'assertive');
      } catch (error) {
        console.error('Error announcing assertive message:', error);
      }
    }
  }
}

```

#### LiveRegionDirective
The LiveRegionDirective sets the aria-live attribute on an element.

```typescript
import { Directive, Input, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[liveRegion]',
})
export class LiveRegionDirective implements OnInit {
  @Input('liveRegion') ariaLive: string = '';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    if (this.isValidAriaLiveValue(this.ariaLive)) {
      this.renderer.setAttribute(
        this.el.nativeElement,
        'aria-live',
        this.ariaLive,
      );
    } else {
      console.error(`Invalid aria-live value: ${this.ariaLive}`);
    }
  }

  private isValidAriaLiveValue(value: string): boolean {
    const validValues = ['off', 'polite', 'assertive'];
    return validValues.includes(value);
  }
}

```

## Consuming the Library in Your Application
Here’s an example of how to use the Angular Accessibility Library in your application:

HTML Template
```html
<div focusTrap class="container">
  <header ariaRole="header" id="header" tabindex="-1" class="header">
    <h1 tabindex="0">Angular A11y APP</h1>
    <h3 class="sub-header" tabindex="0">This app makes use of Ngx-angular-a11y</h3>
  </header>
  <div class="main-layout">
    <aside ariaRole="aside" id="aside" tabindex="-1" class="sidebar">
      <app-sidebar></app-sidebar>
    </aside>
    <main ariaRole="main" id="main-content" tabindex="-1" class="main">

```

Component
```typescript
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

```

#### task-list.component.html
HTML Template
```html
@defer (prefetch on immediate) {
<section focusTrap>
  <h1 tabindex="0">TODO LIST</h1>
  <hr/>
  <div>
    <h1 tabindex="0">Focusable Heading 1</h1>
    <h2 tabindex="0">Focusable Heading 2</h2>
    <label tabindex="0">Focusable Label</label>
    <button ariaRole="button">Button 1</button>
    <button>Button 2</button>
    <button>Button 3</button>
    <button>Button 4</button>
    <a href="#">Link 1</a>
    <input type="text" placeholder="Input field"/>
    <hr/>

    <div role="main">
      <button (click)="openModal()">Open Modal</button>
      <app-modal class="modal" *ngIf="isModalOpen" (close)="closeModal()">
        <h1 tabindex="0">Modal Content</h1>
      </app-modal>

      <button
        (click)="toggle()"
        [ariaProperty]="'aria-expanded'"
        [ariaValue]="isExpanded ? 'true' : 'false'"
      >
        Toggle
      </button>
      <div *ngIf="isExpanded">
        <p>Content is expanded</p>
      </div>
    </div>
    <hr/>
    <h1>Live Region</h1>
    <div liveRegion="assertive" id="notification">
      {{ message }}
    </div>
    <button (click)="updateMessage()">Update Message</button>
    <button (click)="save()">Save</button>
  </div>
  <ul tabindex="0" class="categories">
    @for (category of categories(); track category.id) {
    <li tabindex="0">{{ category.name }}</li>
    <div class="tasks">
      @for (task of category.tasks; track $index) {
      <label tabindex="0"><strong>Name:</strong> {{ task.name }}</label>
      <label><strong>Description:</strong> {{ task.description }}</label>
      <label><strong>Priority:</strong> {{ task.priority }}</label>
      <label><strong>Completed:</strong> {{ task.completed }}</label>
      <label><strong>DueDate:</strong> {{ task.dueDate }}</label>
      }
    </div>
    }
  </ul>
</section>
} @placeholder (minimum 1s) {
<section>
  <h1>TODO LIST</h1>
  <hr/>
  <p>Loading...</p>
</section>
}

```

Component
```typescript
import {
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Category, Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AriaRoleDirective } from '../../../../../ngx-angular-a11y/src/lib/ariarole.directive';
import { FocusTrapDirective } from '../../../../../ngx-angular-a11y/src/lib/focus-trap.directive';
import { LiveRegionDirective } from '../../../../../ngx-angular-a11y/src/lib/live-region.directive';
import { ModalComponent } from '../../modal/modal.component';
import { CommonModule, NgIf } from '@angular/common';
import { LiveAnnouncerService } from '../../../../../ngx-angular-a11y/src/lib/live-announcer.service';
import { KeyboardShortcutsService } from '../../../../../ngx-angular-a11y/src/lib/keyboard-shortcuts.service';
import { RouterOutlet } from '@angular/router';
import { AriaPropertyDirective } from '../../../../../ngx-angular-a11y/src/lib/aria-property.directive';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    AriaRoleDirective,
    LiveRegionDirective,
    ModalComponent,
    NgIf,
    RouterOutlet,
    FocusTrapDirective,
    ModalComponent,
    CommonModule,
    AriaRoleDirective,
    AriaPropertyDirective,
    LiveRegionDirective,
    SidebarComponent,
  ],
  providers: [LiveAnnouncerService, TaskService, KeyboardShortcutsService],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit, OnDestroy {
  categories = signal<Category[]>([]);
  taskService = inject(TaskService);
  destroyRef = inject(DestroyRef);
  isExpanded = false;
  isModalOpen = false;
  message = 'Initial message';

  a11yService = inject(LiveAnnouncerService);
  keyboardShortcutsService = inject(KeyboardShortcutsService);

  ngOnInit(): void {
    // Announce the page load
    this.getTasks();
    this.updateMessageInterval();
    this.keyboardShortcutsService.registerShortcut('Escape', () =>
      this.closeModal(),
    );
    this.keyboardShortcutsService.registerShortcut('Enter', () =>
      this.openModal(),
    );
    this.keyboardShortcutsService.bindKeydownListener();
  }

  getTasks() {
    this.taskService
      .getAllTasks()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((tasks) => {
        this.categories.set(tasks);
      });
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  updateMessageInterval() {
    const intervalId = setInterval(() => {
      this.fetchRandomWords().then((words) => {
        this.message = words;
      });
    }, 6000);
  }

  async fetchRandomWords() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let randomWord = '';

    do {
      randomWord = '';
      for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        randomWord += alphabet[randomIndex];
      }
    } while (randomWord.length < 5);
    return randomWord;
  }

  updateMessage() {
    this.message = 'Updated message';
  }

  save() {
    this.a11yService.announceAssertive('Testing Assertive Announce');
  }

  ngOnDestroy() {
    this.keyboardShortcutsService.unbindKeydownListener();
  }
}

```

## Conclusion

The Angular Accessibility Library provides essential tools to enhance the accessibility of your Angular applications. By leveraging directives like `AriaPropertyDirective`, `AriaRoleDirective`, and `LiveRegionDirective`, along with services such as `FocusService`, `KeyboardShortcutsService`, and `LiveAnnouncerService`, you can ensure your application is more accessible and user-friendly for everyone.

This library simplifies the implementation of ARIA properties, roles, focus management, and live region announcements, making it easier to create inclusive web applications. Whether you're managing focus within a modal, setting ARIA roles dynamically, or announcing updates to users, this library has you covered.

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/raju-cherukuri/angularA11y/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/raju-cherukuri/angularA11y/blob/main/LICENSE) file for the full text)
