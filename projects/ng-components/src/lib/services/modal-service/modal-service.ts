import { DOCUMENT } from '@angular/common';
import { ComponentRef, Inject, Injectable, OnDestroy, Optional, Renderer2, RendererFactory2, TemplateRef } from '@angular/core';
import { ComponentLoaderFactory } from '@indice/ng-components';
import { noop, Subject } from 'rxjs';
import { ComponentLoader } from '../component-loader/component-loader.class';
import { animationTime, cssClassNames } from './modal-styles.class';
import { ModalBackdropComponent } from './modal-backdrop-component';
import { ModalContainerComponent } from './modal-container-component';
import { modalConfigDefaults, ModalOptions, MODAL_CONFIG_DEFAULT_OVERRIDE } from './modal-options.class';
import { Modal } from './modal.class';

/**
 * A service for using modals.
 *
 * @public
 */
@Injectable()
export class ModalService implements OnDestroy {
  private onBeforeShow = new Subject();
  private onShown = new Subject();
  private onBeforeHide = new Subject();
  private onHidden = new Subject();

  private backdropRef?: ComponentRef<ModalBackdropComponent>;
  private defaultConfig: ModalOptions;
  private backdropLoader: ComponentLoader<ModalBackdropComponent>;
  private loaders: ComponentLoader<ModalContainerComponent>[] = [];
  private renderer: Renderer2;
  private modalsCount = 0;
  private initialPadding = '0px';
  constructor(
    private clf: ComponentLoaderFactory,
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    @Optional() @Inject(MODAL_CONFIG_DEFAULT_OVERRIDE) private modalDefaultOption: ModalOptions
  ) {
    this.backdropLoader = this.clf.createLoader<ModalBackdropComponent>();
    this.defaultConfig = { ...modalConfigDefaults, ...modalDefaultOption };
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngOnDestroy(): void {
    this.loaders.forEach((loader) => loader.instance?.hide());
  }

  /**
   * Opens a new modal.
   *
   * @param content - `Component` or `TemplateRef` type.
   * @param config - Specific {@link ModalOptions | options}  for this modal. Global and specific options are merged.
   * @returns An instance of {@link Modal}
   */
  public show<T>(content: string | TemplateRef<any> | { new (...args: any[]): T }, config?: ModalOptions<T>) {
    this.modalsCount++;
    const combinedConfig = { ...this.defaultConfig, ...config };
    combinedConfig.id = config?.id || new Date().getUTCMilliseconds();
    this.createLoaders();

    this.addBodyPadding();
    if (this.modalsCount === 1) {
      this.renderer.addClass(this.document.body, cssClassNames.modalOpen);
    }
    this.showBackdrop(combinedConfig);
    return this.showModal<T>(content, combinedConfig);
  }

  /**
   * Hide an active modal.
   * @param id - Id of modal to hide. If not provided all active modals are hidden.
   * @param result - A result to be sent to observers.
   */
  public hide(id?: number | string, result?: any) {
    if (this.modalsCount === 1 || id == null) {
      this.hideBackdrop();
      this.revertScrollbar();
      this.renderer.removeClass(this.document.body, cssClassNames.modalOpen);
    }
    this.modalsCount = this.modalsCount >= 1 && id != null ? this.modalsCount - 1 : 0;
    setTimeout(
      () => {
        this.hideModal(id, result);
        this.removeLoaders(id);
      },
      //Bug 
      //Should use combined config but for the moment is not possible to pass it this parameter.
      //If config is an instance variable then every newly opened modal will override the config
      //resulting in opened modals to get a new configuration
      this.defaultConfig.animated ? animationTime.backdrop : 0
    );
  }

  public getActiveModal(): ModalContainerComponent {
    return this.loaders[this.modalsCount - 1].instance as ModalContainerComponent;
  }

  private showModal<T>(content: any, combinedConfig: ModalOptions): Modal<T> {
    const modalLoader = this.loaders[this.loaders.length - 1];
    if (combinedConfig && combinedConfig.providers) {
      combinedConfig.providers.forEach((provider) => modalLoader.provide(provider));
    }

    const modal = new Modal<any>();
    const modalContainerRef = modalLoader
      .provide({ provide: ModalOptions, useValue: combinedConfig })
      .provide({ provide: Modal, useValue: modal })
      .attach(ModalContainerComponent)
      .to('body');

    modal.setClass = (newClass: string) => {
      if (modalContainerRef.instance) {
        modalContainerRef.instance.config.class = newClass;
      }
    };

    modal.onBeforeHide = new Subject();
    modal.onHidden = new Subject();
    this.copyEvent(modalLoader.onBeforeHide, modal.onBeforeHide);
    this.copyEvent(modalLoader.onHidden, modal.onHidden);
    modalContainerRef.show({
      content,
      animationsEnabled: combinedConfig.animated,
      initialState: combinedConfig.initialState,
      modalService: this,
      id: combinedConfig.id,
    });

    if (modalContainerRef.instance) {
      modalContainerRef.instance.level = this.modalsCount;
      modal.content = modalLoader.getInnerComponent();
      modal.id = modalContainerRef.instance.config?.id;
      modal.hide = (res) => modalContainerRef.instance?.hide(res);
    }

    return modal;
  }

  private hideModal(id?: number | string, result?: any): void {
    if (id != null) {
      const indexToRemove = this.loaders.findIndex((loader) => loader.instance?.config.id === id);
      const modalLoader = this.loaders[indexToRemove];
      if (modalLoader) {
        modalLoader.hide(id, result);
      }
    } else {
      this.loaders.forEach((loader: ComponentLoader<ModalContainerComponent>) => {
        if (loader.instance) {
          loader.hide(loader.instance.config.id);
        }
      });
    }
  }

  private showBackdrop(combinedConfig: ModalOptions): void {
    const isBackdropEnabled = combinedConfig.backdrop === true || combinedConfig.backdrop === 'static';
    const isBackdropInDOM = this.backdropRef != null;
    if (isBackdropEnabled && !isBackdropInDOM) {
      this.backdropLoader
        .attach(ModalBackdropComponent)
        .to('body')
        .show({ animationsEnabled: combinedConfig.animated, backdropLoader: this.backdropLoader });
      this.backdropRef = this.backdropLoader.componentRef;
    }
  }

  private hideBackdrop(): void {
    if (!this.backdropRef) {
      return;
    }
    this.backdropRef.instance.hide();
    this.backdropRef = void 0;
  }

  private removeLoaders(id?: number | string): void {
    if (id != null) {
      const indexToRemove = this.loaders.findIndex((loader) => loader.instance?.config.id === id);
      if (indexToRemove >= 0) {
        this.loaders.splice(indexToRemove, 1);
        this.loaders.forEach((loader: ComponentLoader<ModalContainerComponent>, i: number) => {
          if (loader.instance) {
            loader.instance.level = i + 1;
          }
        });
      }
    } else {
      this.loaders.splice(0, this.loaders.length);
    }
  }

  private addBodyPadding() {
    if (this.modalsCount === 1) {
      const width = this.getScrollbarWidth();
      if (this.isScrollBarPresent(width)) {
        this.initialPadding = this.document.body.style.paddingRight;
        const actualPadding = parseFloat(window.getComputedStyle(this.document.body).paddingRight);
        this.document.body.style.paddingRight = `${actualPadding + width}px`;
      }
    }
  }

  private revertScrollbar() {
    this.document.body.style.paddingRight = this.initialPadding;
  }

  private getScrollbarWidth(): number {
    const measurer = this.document.createElement('div');
    measurer.className = 'modal-scrollbar-measure';

    const body = this.document.body;
    body.appendChild(measurer);
    const width = measurer.getBoundingClientRect().width - measurer.clientWidth;
    body.removeChild(measurer);

    return width;
  }

  private isScrollBarPresent(scrollbarWidth: number) {
    const rect = this.document.body.getBoundingClientRect();
    const bodyToViewportGap = window.innerWidth - (rect.left + rect.right);
    const uncertainty = 0.1 * scrollbarWidth;
    return bodyToViewportGap >= scrollbarWidth - uncertainty;
  }

  private createLoaders(): void {
    const loader = this.clf.createLoader<ModalContainerComponent>();
    this.copyEvent(loader.onBeforeShow, this.onBeforeShow);
    this.copyEvent(loader.onShown, this.onShown);
    this.copyEvent(loader.onBeforeHide, this.onBeforeHide);
    this.copyEvent(loader.onHidden, this.onHidden);
    this.loaders.push(loader);
  }

  private copyEvent(from: Subject<unknown>, to: Subject<unknown>) {
    from.subscribe((data) => {
      to.next(data);
    });
  }
}
