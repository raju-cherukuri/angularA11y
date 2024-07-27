import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FocusService {
  private previousFocus: HTMLElement | null = null;

  /**
   * Saves the current active element in the document.
   */
  saveFocus() {
    this.previousFocus = document.activeElement as HTMLElement;
  }

  /**
   * Restores the previously saved active element.
   * @param previousFocus The previously saved active element.
   * @returns Nothing.
   */
  restoreFocus() {
    if (this.previousFocus) {
      this.previousFocus.focus();
    }
  }
}
