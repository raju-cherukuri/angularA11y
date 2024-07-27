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
