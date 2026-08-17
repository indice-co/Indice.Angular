import { Component, ContentChild, ContentChildren, OnInit, QueryList, TemplateRef, ChangeDetectionStrategy, input, output, contentChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'lib-content-tile-header', template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentTileHeaderComponent {
  @ContentChild(TemplateRef) template: any | undefined = undefined;
  constructor() { }
}


@Component({
    selector: 'lib-content-tile-item', template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentTileItemComponent {
  readonly title = input<string>();
  readonly template = contentChild(TemplateRef);
  constructor() { }
}

@Component({
    selector: 'lib-content-tile',
    templateUrl: './content-tile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgTemplateOutlet]
})
export class ContentTileComponent implements OnInit {

  readonly title = input<string>();
  readonly busy = input(false);
  readonly showAction = input<boolean | undefined>(true, { alias: "show-action" });
  readonly showFooter = input<boolean | undefined>(true, { alias: "show-footer" });
  readonly actionText = input<string>('More', { alias: "action-text" });
  // tslint:disable-next-line:no-output-rename
  readonly tileAction = output<any>({ alias: 'tile-action' });
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

