//
// https://github.com/arkon/ng-click-outside
// the project is inactive - so imoved the directive code in our project
//
import {
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  SimpleChanges,
  NgZone,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[clickOutside]' })
export class ClickOutsideDirective implements OnInit, OnChanges, OnDestroy {

  @Input() clickOutsideEnabled = true;

  @Input() attachOutsideOnClick = false;
  @Input() delayClickOutsideInit = false;
  @Input() emitOnBlur = false;

  @Input() exclude = '';
  @Input() excludeBeforeClick = false;

  @Input() clickOutsideEvents = '';

  @Output() clickOutside: EventEmitter<Event> = new EventEmitter<Event>();

  // tslint:disable-next-line:variable-name
  private _nodesExcluded: Array<HTMLElement> = [];
  // tslint:disable-next-line:variable-name
  private _events: Array<string> = ['click'];

  constructor(
    // tslint:disable-next-line:variable-name
    private _el: ElementRef,
    // tslint:disable-next-line:variable-name
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

    // tslint:disable-next-line:no-string-literal
    if (changes['attachOutsideOnClick'] || changes['exclude'] || changes['emitOnBlur']) {
      this._init();
    }
  }

  private _init(): void {
    if (this.clickOutsideEvents !== '') {
      this._events = this.clickOutsideEvents.split(',').map(e => e.trim());
    }

    this._excludeCheck();

    if (this.attachOutsideOnClick) {
      this._initAttachOutsideOnClickListener();
    } else {
      this._initOnClickBody();
    }

    if (this.emitOnBlur) {
      this._initWindowBlurListener();
    }
  }

  private _initOnClickBody(): void {
    if (this.delayClickOutsideInit) {
      setTimeout(this._initClickOutsideListener.bind(this));
    } else {
      this._initClickOutsideListener();
    }
  }

  private _excludeCheck(): void {
    if (this.exclude) {
      try {
        const nodes = Array.from(document.querySelectorAll(this.exclude)) as Array<HTMLElement>;
        if (nodes) {
          this._nodesExcluded = nodes;
        }
      } catch (err) {
        console.error('[ng-click-outside] Check your exclude selector syntax.', err);
      }
    }
  }

  private _onClickBody(ev: Event): void {
    if (!this.clickOutsideEnabled) { return; }

    if (this.excludeBeforeClick) {
      this._excludeCheck();
    }

    if (!this._el.nativeElement.contains(ev.target) && !this._shouldExclude(ev.target)) {
      this._emit(ev);

      if (this.attachOutsideOnClick) {
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
    if (!this.clickOutsideEnabled) { return; }

    this._ngZone.run(() => this.clickOutside.emit(ev));
  }

  private _shouldExclude(target: any): boolean {
    // tslint:disable-next-line:prefer-const
    for (let excludedNode of this._nodesExcluded) {
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
