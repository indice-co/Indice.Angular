import { Component, ContentChild, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ContentTileHeaderComponent } from './content-tile-header/content-tile-header.component';
import { ContentTileItemComponent } from './content-tile-item/content-tile-item.component';

@Component({
  selector: 'lib-content-tile',
  templateUrl: './content-tile.component.html'
})
export class ContentTileComponent implements OnInit {

  @Input() title: string | undefined = undefined;
  @Input() busy = false;
  @Input('show-action') showAction: boolean | undefined = true;
  @Input('show-footer') showFooter: boolean | undefined = true;
  @Input('action-text') actionText: string = 'Περισσότερα';
  // tslint:disable-next-line:no-output-rename
  @Output('tile-action') tileAction: EventEmitter<any> = new EventEmitter<any>();
  public selectedIndex = 0;

  public itemTemplates: any[] = [];
  @ContentChildren(ContentTileItemComponent, { read: ContentTileItemComponent })
  set items(refs: QueryList<ContentTileItemComponent>) {
    if (refs) {
      this.itemTemplates = refs.toArray();
      console.log('ContentTileComponent',this.itemTemplates);
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

