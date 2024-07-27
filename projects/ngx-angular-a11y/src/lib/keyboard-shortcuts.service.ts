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
        this.shortcuts[event.key]();
      }
    });
  }

  /**
   * Registers a keyboard shortcut with the specified key and callback function.
   * @param key The key to be used as the shortcut.
   * @param callback The function to be executed when the shortcut is triggered.
   */
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
