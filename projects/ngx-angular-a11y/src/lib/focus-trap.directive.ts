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

  /**
   * Get all focusable elements within the element that the directive is applied to.
   *
   * @returns An array of HTMLElements that are focusable within the element.
   */
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

  /**
   * Traps the focus within the element that the directive is applied to.
   *
   * @param {KeyboardEvent} event - The keyboard event that triggered the focus trapping.
   */
  private trapFocus(event: KeyboardEvent) {
    const firstElement = this.focusableElements[0];
    const lastElement =
      this.focusableElements[this.focusableElements.length - 1];

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        lastElement.focus();
        console.log(' Shift + Tab');
        event.preventDefault();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        firstElement.focus();
        console.log(' Tab');
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
