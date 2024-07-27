import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ElementRef,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { FocusService } from '../../../../ngx-angular-a11y/src/lib/focus.service';
import { FocusTrapDirective } from '../../../../ngx-angular-a11y/src/lib/focus-trap.directive';

@Component({
  selector: 'app-modal',
  imports: [FocusTrapDirective],
  template: `
    <div focusTrap role="dialog" aria-modal="true">
      <ng-content></ng-content>
      <button (click)="closeModal()">Close</button>
    </div>
  `,
  standalone: true,
})
export class ModalComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() close = new EventEmitter<void>();
  @ViewChild(FocusTrapDirective) focusTrapDirective: FocusTrapDirective | null =
    null;

  constructor(
    private focusService: FocusService,
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.focusService.saveFocus();
  }

  ngAfterViewInit() {
    this.focusTrapDirective!.focusFirstElement();
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.focusService.restoreFocus();
  }

  closeModal() {
    this.close.emit();
  }
}
