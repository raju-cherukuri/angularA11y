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

  /**
   * A directive that sets the 'role' attribute on an HTML element based on the provided input.
   * This is useful for providing semantic meaning to the element and improving accessibility.
   *
   * @param {ElementRef} el - The reference to the HTML element on which the 'role' attribute will be set.
   * @param {Renderer2} renderer - The renderer service used to manipulate the DOM.
   * @param {string} role - The role to be set on the HTML element. Defaults to an empty string.
   */
  ngOnInit() {
    this.renderer.setAttribute(this.el.nativeElement, 'role', this.role);
  }
}
