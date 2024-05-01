import {
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentFactory,
  Type,
  ElementRef,
  StaticProvider,
  TemplateRef,
  ComponentRef,
  ApplicationRef,
  Injector,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ComponentLoaderOptions } from './component-loader-options.class';
import { ContentRef } from './content-ref.class';

/**
 * Provides ways of loading and handling dynamic content.
 *
 * @remarks
 * Do NOT use this directly, create an instance through {@link ComponentLoaderFactory}
 * You can use this loader in two ways:
 * - Attaches a component to `ViewContainerRef`.
 * - Attaches a component to `ViewContainerRef`. The attached component has a `<ng-content>` tag inside its view. The {@link ComponentLoaderOptions.content} will be drawn inside this tag.
 *
 * @internal
 */
export class ComponentLoader<T extends object> {
  /**
   * Before content is shown event.
   */
  onBeforeShow = new Subject();
  /**
   * After show content event.
   * @returns The id of newly created component ref.
   */
  onShown = new Subject();
  /**
   * Before content is hidden event.
   * @returns The instance of attached component;
   */
  onBeforeHide = new Subject();
  /**
   * After content is hidden event.
   * @returns The id of destroyed component ref.
   */
  onHidden = new Subject();

  public instance?: T;
  public componentRef?: ComponentRef<T>;
  private componentFactory?: ComponentFactory<T>;
  private container: string | ElementRef | any;
  private providers: StaticProvider[] = [];
  private contentRef?: ContentRef;
  private containerDefaultSelector = 'body';
  private innerComponent?: ComponentRef<T>;
  constructor(
    private vcr: ViewContainerRef | undefined,
    private cfr: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector
  ) {}

  /**
   * Attaches component.
   * @param componentType - The type component to attach.
   * @returns Current instance of {@link ComponentLoader}
   */
  public attach(componentType: Type<T>): ComponentLoader<T> {
    this.componentFactory = this.cfr.resolveComponentFactory<T>(componentType);
    return this;
  }

  /**
   * Body will be used in nothing is provided.
   * @param container - The element in which dynamic content will be drawn inside to. For string case a query to the dom will be executed to find the element.
   * @returns Current instance of {@link ComponentLoader}
   */
  public to(container?: string | ElementRef): ComponentLoader<T> {
    this.container = container || this.container;
    return this;
  }

  /**
   * Adds provider to the providers array. These providers will be injected to the attached component.
   *
   * @see {@link https://angular.io/guide/glossary#di-token | Injection Token}
   *
   * @param provider - Provider to inject.
   * @returns Current instance of {@link ComponentLoader}
   */
  public provide(provider: StaticProvider): ComponentLoader<T> {
    this.providers.push(provider);
    return this;
  }

  /**
   * Attaches attached component to dom and any dynamic content if provided.
   * @remarks
   * Also triggers the {@link ComponentLoader.onBeforeShow} and {@link ComponentLoader.onShown} events.
   *
   * @param options - {@link ComponentLoaderOptions}.
   * @returns A reference to the created content.
   */
  public show(options: ComponentLoaderOptions = {}): ComponentRef<T> | undefined {
    if (this.componentRef) {
      throw Error('Component is already shown');
    }
    if (!this.componentFactory) {
      throw Error('You must attach a component');
    }
    this.onBeforeShow.next({});

    if (options.content) {
      this.contentRef = this.getContentRef(options.content, options.context, options.initialState);
    }
    this.createComponentAndAttachToView(options);
    this.appendContentToContainer();
    this.markComponentsForCheck();

    this.onShown.next(options.id);

    return this.componentRef;
  }

  /**
   * Removes attached component from dom.
   * @remarks
   * Also triggers the {@link ComponentLoader.onBeforeHide} and {@link ComponentLoader.onHidden} events.
   *
   * @param id - If provided it is returned through the {@link ComponentLoader.onHidden}.
   * @returns Current instance of {@link ComponentLoader}
   */
  public hide(id?: number | string, result?: any): ComponentLoader<T> {
    if (!this.componentRef) {
      throw Error('No attached component found to hide');
    }

    this.onBeforeHide.next(this.componentRef.instance);

    const componentEl = this.componentRef.location.nativeElement;
    componentEl.parentNode.removeChild(componentEl);
    if (this.contentRef?.componentRef) {
      this.contentRef.componentRef.destroy();
    }
    if (this.vcr && this.contentRef?.viewRef) {
      this.vcr.remove(this.vcr.indexOf(this.contentRef.viewRef));
    }
    if (this.contentRef?.viewRef) {
      this.contentRef.viewRef.destroy();
    }
    this.contentRef = void 0;
    this.componentRef = void 0;

    this.onHidden.next(id ? { id, result } : null);

    return this;
  }

  getInnerComponent(): ComponentRef<T> | undefined {
    return this.innerComponent;
  }

  private markComponentsForCheck() {
    if (this.contentRef?.componentRef) {
      this.innerComponent = this.contentRef.componentRef.instance;
      this.contentRef.componentRef.changeDetectorRef.markForCheck();
      this.contentRef.componentRef.changeDetectorRef.detectChanges();
    }
    this.componentRef!.changeDetectorRef.markForCheck();
    this.componentRef!.changeDetectorRef.detectChanges();
  }

  private createComponentAndAttachToView(options: ComponentLoaderOptions) {
    const injector = Injector.create({
      providers: this.providers,
      parent: this.injector,
    });
    this.componentRef = this.componentFactory!.create(injector, this.contentRef?.nodes);
    this.applicationRef.attachView(this.componentRef.hostView);
    this.instance = this.componentRef.instance;
    Object.assign(this.componentRef.instance, options);
  }

  private appendContentToContainer() {
    if (this.container instanceof ElementRef) {
      this.container.nativeElement.appendChild(this.componentRef?.location.nativeElement);
    }
    if (typeof this.container === 'string' && typeof document !== 'undefined') {
      const selectedElement = document.querySelector(this.container) || document.querySelector(this.containerDefaultSelector);
      if (!selectedElement) {
        return;
      }
      selectedElement.appendChild(this.componentRef?.location.nativeElement);
    }
  }

  private getContentRef(content?: string | TemplateRef<any>, context?: any, initialState?: any): ContentRef {
    //TemplateRef case
    if (content instanceof TemplateRef) {
      if (this.vcr) {
        const viewRef = this.vcr.createEmbeddedView<TemplateRef<T>>(content, context);
        viewRef.markForCheck();
        return new ContentRef([viewRef.rootNodes], viewRef);
      }
      const viewRef = content.createEmbeddedView({});
      this.applicationRef.attachView(viewRef);
      return new ContentRef([viewRef.rootNodes], viewRef);
    }

    //Component case
    if (typeof content === 'function') {
      const contentCf = this.cfr.resolveComponentFactory(content);
      const injector = Injector.create({
        providers: this.providers,
        parent: this.injector,
      });
      const componentRef = contentCf.create(injector);
      // Object.assign(componentRef.instance, initialState);
      this.applicationRef.attachView(componentRef.hostView);
      return new ContentRef([[componentRef.location.nativeElement]], componentRef.hostView, componentRef);
    }

    throw Error('Unsupported content type');
  }
}
