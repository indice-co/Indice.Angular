import { Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { animationTime, cssClassNames } from './modal-styles.class';
import { ModalOptions } from './modal-options.class';
import { ModalService } from './modal-service';

/**
 * Modal container component.
 * @remarks
 * All dynamic content `TemplateRef` or `Component` case will be drawn inside this.
 * You can override css classes to theme it {@link cssClassNames}
 * @internal
 */
@Component({
  selector: 'lib-modal-container',
  template: `
    <div [class]="'modal-dialog' + (config.class ? ' ' + config.class : '')" role="document" focusTrap>
      <div class="modal-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  host: {
    class: 'modal',
    role: 'dialog',
    tabindex: '-1',
    '[attr.aria-modal]': 'true',
    '[attr.aria-labelledby]': 'config.ariaLabelledBy',
    '[attr.aria-describedby]': 'config.ariaDescribedby',
  },
})
export class ModalContainerComponent implements OnInit, OnDestroy {
  public level?: number;
  public config: ModalOptions;
  public modalService?: ModalService;
  private isShown = false;
  private animationsEnabled = false;
  private isModalHiding = false;
  private clickStartedInContent = false;
  constructor(options: ModalOptions, protected _element: ElementRef, private renderer: Renderer2) {
    this.config = Object.assign({}, options);
  }

  ngOnInit(): void {
    if (this.animationsEnabled) {
      this.renderer.addClass(this._element.nativeElement, cssClassNames.fade);
    }
    this.renderer.setStyle(this._element.nativeElement, 'display', 'block');
    setTimeout(
      () => {
        this.isShown = true;
        this.renderer.addClass(this._element.nativeElement, cssClassNames.show);
      },
      this.animationsEnabled ? animationTime.backdrop : 0
    );
    if (this._element.nativeElement) {
      this._element.nativeElement.focus();
    }
  }

  @HostListener('mousedown', ['$event'])
  onClickStarted(event: MouseEvent): void {
    this.clickStartedInContent = event.target !== this._element.nativeElement;
  }

  @HostListener('click', ['$event'])
  onClickStop(event: MouseEvent): void {
    const clickedInBackdrop = event.target === this._element.nativeElement && !this.clickStartedInContent;
    if (this.config.ignoreBackdropClick || this.config.backdrop === 'static' || !clickedInBackdrop) {
      this.clickStartedInContent = false;
      return;
    }
    this.hide();
  }

  @HostListener('window:popstate')
  onPopState(): void {
    this.hide();
  }

  @HostListener('window:keydown.esc', ['$event'])
  onEsc(event: KeyboardEvent): void {
    if (!this.isShown) {
      return;
    }
    if (event.keyCode === 27 || event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault();
    }
    if (this.config.keyboard && this.config.id === this.modalService?.getActiveModal().config.id) {
      this.hide();
    }
  }

  ngOnDestroy(): void {
    if (this.isShown) {
      this._hide();
    }
  }

  hide(result?: any): void {
    if (this.isModalHiding || !this.isShown) {
      return;
    }
    if (this.config.closeInterceptor) {
      this.config.closeInterceptor().then(
        () => this._hide(),
        () => undefined
      );
      return;
    }
    this._hide(result);
  }

  private _hide(result?: any): void {
    this.isModalHiding = true;
    this.renderer.removeClass(this._element.nativeElement, cssClassNames.show);
    setTimeout(
      () => {
        this.isShown = false;
        this.modalService?.hide(this.config.id, result);
        this.isModalHiding = false;
      },
      this.animationsEnabled ? animationTime.modal : 0
    );
  }
}
