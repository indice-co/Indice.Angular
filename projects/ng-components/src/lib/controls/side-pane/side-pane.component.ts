import { Component, DOCUMENT, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { SidePaneOverlayType, SidePaneSize } from '../../types';
@Component({ selector: 'lib-side-pane', templateUrl: './side-pane.component.html', standalone: false })
export class SidePaneComponent implements OnInit, OnDestroy, OnChanges {
  @Input('visible')
  protected showPane = false;
  public sizeContainerStyle = 'side-pane-box-size';
  public overlayStyle = 'side-pane-overlay';
  @Input('pane-size') size: SidePaneSize | undefined;
  @Output() onComplete: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onOpen: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
  @Input('params') params: any | undefined;
  @Input() template: TemplateRef<any> | undefined;
  
  constructor(private router: Router, @Inject(DOCUMENT) private document: any,) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes && changes['size']) this.initPane();
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void  {
  }

  public onSidePaneActivated(component: any): void  {
    this.initPane(this.router.getCurrentNavigation()?.extras?.state);
    this.show();
  }

  private initPane(state?: any) {
    //priority to property for size
    this.sizeContainerStyle = this.sizeToClass(this.size ?? state?.paneSize);
    this.overlayStyle = this.overlayToClass(state?.paneOverlay);
  }

  private overlayToClass(overlay?: SidePaneOverlayType): string {
    if(!overlay) return 'side-pane-overlay';
    if (overlay === SidePaneOverlayType.None)  {
      return 'side-pane-overlay-opacity-0';
    } else if (overlay === SidePaneOverlayType.Dark) {
      return 'side-pane-overlay-opacity-50';
    }
    return 'side-pane-overlay';
  }

  private sizeToClass(size?: SidePaneSize): string {
    if(!size) return 'side-pane-box-size';
    let sizeStyleSuffix: string = '-25';
    if (size === SidePaneSize.Small25) {
      sizeStyleSuffix = '-25';
    } else if (size === SidePaneSize.Medium50) {
      sizeStyleSuffix = '-50';
    } else if (size === SidePaneSize.Large75) {
      sizeStyleSuffix = '-75';
    }
    else if (size === SidePaneSize.Fullscreen) {
      sizeStyleSuffix = '-100';
    }
    return `side-pane-box-size${sizeStyleSuffix}`;
  }

  public onSidePaneDeactivated($event: any): void  {  
    this.hide();
  }

  public show(): void {
    this.document.body.classList.add('modal-active');
    this.showPane = true;
    this.onOpen.emit(true);
  }

  public hide(): void {
    this.showPane = false;
    this.document.body.classList.remove('modal-active');
    this.onClose.emit(false);
    // prepei na allaxei auto!
    this.onComplete.emit(true);
  }
}
