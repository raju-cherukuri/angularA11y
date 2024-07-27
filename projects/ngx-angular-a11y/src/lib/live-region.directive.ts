import { Directive, Input, Renderer2, ElementRef, OnInit } from '@angular/core';

/**
 * Directive to set the 'aria-live' attribute on an element based on the input 'liveRegion'.
 * This attribute is used to indicate that the content of the element will change and should be announced by assistive technologies.
 *
 * @param {ElementRef} el - The reference to the element on which the 'aria-live' attribute will be set.
 * @param {Renderer2} renderer - The renderer service to manipulate the DOM.
 * @param {string} ariaLive - The value of the 'aria-live' attribute. Defaults to an empty string.
 */
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
    this.renderer.setAttribute(
      this.el.nativeElement,
      'aria-live',
      this.ariaLive,
    );
  }
}
