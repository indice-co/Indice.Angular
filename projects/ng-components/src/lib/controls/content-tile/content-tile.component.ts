import { Component, ContentChild, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'lib-content-tile-header', template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ContentTileHeaderComponent {
  @ContentChild(TemplateRef) template: any | undefined = undefined;
  constructor() { }
}


@Component({
    selector: 'lib-content-tile-item', template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ContentTileItemComponent {
  @Input() title: string | undefined;
  @ContentChild(TemplateRef) template: any | undefined = undefined;
  constructor() { }
}

@Component({
    selector: 'lib-content-tile',
    templateUrl: './content-tile.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ContentTileComponent implements OnInit {

  @Input() title: string | undefined = undefined;
  @Input() busy = false;
  @Input('show-action') showAction: boolean | undefined = true;
  @Input('show-footer') showFooter: boolean | undefined = true;
  @Input('action-text') actionText: string = 'More';
  // tslint:disable-next-line:no-output-rename
  @Output('tile-action') tileAction: EventEmitter<any> = new EventEmitter<any>();
  public selectedIndex = 0;

  public itemTemplates: any[] = [];
  @ContentChildren(ContentTileItemComponent, { read: ContentTileItemComponent })
  set items(refs: QueryList<ContentTileItemComponent>) {
    if (refs) {
      this.itemTemplates = refs.toArray();
    }
  }

  @ContentChild(ContentTileHeaderComponent) header: ContentTileHeaderComponent | undefined = undefined;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public emitTileAction($event: any): boolean {
    $event.preventDefault();
    $event.stopPropagation();
    this.tileAction.emit($event);
    return false;
  }

}

