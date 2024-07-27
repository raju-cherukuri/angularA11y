import { Directive, Input, Renderer2, ElementRef, OnInit } from '@angular/core';

/**
 * A directive that sets an ARIA property and its value on an element.
 *
 * @param {string} [ariaProperty] - The ARIA property to be set.
 * @param {string} [ariaValue] - The value for the specified ARIA property.
 */
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
