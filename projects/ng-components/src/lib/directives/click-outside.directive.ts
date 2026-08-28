//
// https://github.com/arkon/ng-click-outside
// the project is inactive - so imoved the directive code in our project
//
import {
  Directive,
  ElementRef,
  Inject,
  OnChanges,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  SimpleChanges,
  NgZone,
  input,
  output
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Directive({ selector: '[clickOutside]' })
export class ClickOutsideDirective implements OnInit, OnChanges, OnDestroy {

  readonly clickOutsideEnabled = input(true);

  readonly attachOutsideOnClick = input(false);
  readonly delayClickOutsideInit = input(false);
  readonly emitOnBlur = input(false);

  readonly exclude = input('');
  readonly excludeBeforeClick = input(false);

  readonly clickOutsideEvents = input('');

  readonly clickOutside = output<Event>();

 
  private _nodesExcluded: HTMLElement[] = [];
 
  private _events: string[] = ['click'];

  constructor(
   
    private _el: ElementRef,
   
    private _ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: any) {
    this._initOnClickBody = this._initOnClickBody.bind(this);
    this._onClickBody = this._onClickBody.bind(this);
    this._onWindowBlur = this._onWindowBlur.bind(this);
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) { return; }

    this._init();
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) { return; }

    this._removeClickOutsideListener();
    this._removeAttachOutsideOnClickListener();
    this._removeWindowBlurListener();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isPlatformBrowser(this.platformId)) { return; }

   
    if (changes['attachOutsideOnClick'] || changes['exclude'] || changes['emitOnBlur']) {
      this._init();
    }
  }

  private _init(): void {
    const clickOutsideEvents = this.clickOutsideEvents();
    if (clickOutsideEvents !== '') {
      this._events = clickOutsideEvents.split(',').map(e => e.trim());
    }

    this._excludeCheck();

    if (this.attachOutsideOnClick()) {
      this._initAttachOutsideOnClickListener();
    } else {
      this._initOnClickBody();
    }

    if (this.emitOnBlur()) {
      this._initWindowBlurListener();
    }
  }

  private _initOnClickBody(): void {
    if (this.delayClickOutsideInit()) {
      setTimeout(this._initClickOutsideListener.bind(this));
    } else {
      this._initClickOutsideListener();
    }
  }

  private _excludeCheck(): void {
    const exclude = this.exclude();
    if (exclude) {
      try {
        const nodes = Array.from(document.querySelectorAll(exclude)) as HTMLElement[];
        if (nodes) {
          this._nodesExcluded = nodes;
        }
      } catch (err) {
        console.error('[ng-click-outside] Check your exclude selector syntax.', err);
      }
    }
  }

  private _onClickBody(ev: Event): void {
    if (!this.clickOutsideEnabled()) { return; }

    if (this.excludeBeforeClick()) {
      this._excludeCheck();
    }

    if (!this._el.nativeElement.contains(ev.target) && !this._shouldExclude(ev.target)) {
      this._emit(ev);

      if (this.attachOutsideOnClick()) {
        this._removeClickOutsideListener();
      }
    }
  }

  /**
   * Resolves problem with outside click on iframe
   * @see https://github.com/arkon/ng-click-outside/issues/32
   */
  private _onWindowBlur(ev: Event): void {
    setTimeout(() => {
      if (!document.hidden) {
        this._emit(ev);
      }
    });
  }

  private _emit(ev: Event): void {
    if (!this.clickOutsideEnabled()) { return; }

    this._ngZone.run(() => this.clickOutside.emit(ev));
  }

  private _shouldExclude(target: any): boolean {
   
    for (const excludedNode of this._nodesExcluded) {
      if (excludedNode.contains(target)) {
        return true;
      }
    }

    return false;
  }

  private _initClickOutsideListener(): void {
    this._ngZone.runOutsideAngular(() => {
      this._events.forEach(e => document.addEventListener(e, this._onClickBody));
    });
  }

  private _removeClickOutsideListener(): void {
    this._ngZone.runOutsideAngular(() => {
      this._events.forEach(e => document.removeEventListener(e, this._onClickBody));
    });
  }

  private _initAttachOutsideOnClickListener(): void {
    this._ngZone.runOutsideAngular(() => {
      this._events.forEach(e => this._el.nativeElement.addEventListener(e, this._initOnClickBody));
    });
  }

  private _removeAttachOutsideOnClickListener(): void {
    this._ngZone.runOutsideAngular(() => {
      this._events.forEach(e => this._el.nativeElement.removeEventListener(e, this._initOnClickBody));
    });
  }

  private _initWindowBlurListener(): void {
    this._ngZone.runOutsideAngular(() => {
      window.addEventListener('blur', this._onWindowBlur);
    });
  }

  private _removeWindowBlurListener(): void {
    this._ngZone.runOutsideAngular(() => {
      window.removeEventListener('blur', this._onWindowBlur);
    });
  }
}
