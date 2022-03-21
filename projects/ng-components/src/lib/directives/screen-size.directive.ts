import { Directive, ElementRef, HostListener, AfterViewInit, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ScreenSizeService } from '../services/screen-size-service';
import { IScreenSize, SCREEN_SIZE } from '../types';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[visibleForScreen]'
})
export class ScreenSizeDirective implements AfterViewInit {
  private hasView = false;
  private prefix = 'is-';
  private sizes: IScreenSize[] = [
    {
      id: SCREEN_SIZE.XS, name: 'xs',
      css: `d-block d-sm-none`
    }, {
      id: SCREEN_SIZE.SM, name: 'sm',
      css: `d-none d-sm-block d-md-none`
    }, {
      id: SCREEN_SIZE.MD, name: 'md',
      css: `d-none d-md-block d-lg-none`
    }, {
      id: SCREEN_SIZE.LG, name: 'lg',
      css: `d-none d-lg-block d-xl-none`
    }, {
      id: SCREEN_SIZE.XL, name: 'xl',
      css: `d-none d-xl-block`
    }
  ];

  @Input() set visibleForScreen(size: string) {
    this.updateElementVisibility(size);
  }

  private currentSize: IScreenSize | undefined = undefined;
  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { }

  @HostListener('window:resize', [])
  private onResize(): void {
    this.detectScreenSize();
  }

  public ngAfterViewInit(): void {
    this.detectScreenSize();
  }

  private detectScreenSize(): void {
    this.currentSize = this.sizes.find(x => {
      const el = this.viewContainer.element.nativeElement.querySelector(`.${this.prefix}${x.id}`);
      const isVisible = window.getComputedStyle(el).display !== 'none';
      return isVisible;
    });
    //console.log('detectScreenSize', this.currentSize);
  }

  private updateElementVisibility(target: string): void {
    // if it should be rendered and it is not already rendered
    // DO IT, DO IT NOWWWW
    if (!this.hasView && this.currentSize && this.currentSize.name === target) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
