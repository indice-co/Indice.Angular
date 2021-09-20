import { Component, ElementRef, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { ComponentLoader } from '../component-loader/component-loader.class';
import { animationTime, cssClassNames } from './modal-styles.class';

/**
 * Background layer for modals.
 * Override class name to theme it.
 * @see {@link cssClassNames}
 * @internal
 */
@Component({
  selector: 'lib-modal-backdrop',
  encapsulation: ViewEncapsulation.None,
  template: '',
  host: {
    class: cssClassNames.backdrop,
  },
})
export class ModalBackdropComponent implements OnInit {
  private animationsEnabled = false;
  private backdropLoader: ComponentLoader<ModalBackdropComponent> | undefined;
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.animationsEnabled) {
      this.renderer.addClass(this.element.nativeElement, cssClassNames.fade);
      this.reflow(this.element.nativeElement);
    }
    this.renderer.addClass(this.element.nativeElement, cssClassNames.show);
  }

  public hide() {
    this.renderer.removeClass(this.element.nativeElement, cssClassNames.show);
    setTimeout(() => this.backdropLoader?.hide(), this.animationsEnabled ? animationTime.backdrop : 0);
  }

  reflow(element: any): void {
    ((bs: any): void => bs)(element.offsetHeight);
  }
}
