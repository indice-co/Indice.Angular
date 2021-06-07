import { Component, ContentChild, ContentChildren, EventEmitter, Input, Output, QueryList, OnChanges, SimpleChanges } from '@angular/core';
import { MenuOption } from '../../types';
import { ListTileComponent } from './list-tile.component';
import { ListColumnComponent } from './list-column.component';
import { ListDetailsSectionComponent } from './list-details-section.component';

@Component({
  selector: 'lib-list-view',
  templateUrl: './list-view.component.html'
})
export class ListViewComponent implements OnChanges {
  // tslint:disable-next-line:no-input-rename
  @Input('show-pager') showPager = true;
  // DATA SOURCE!
  @Input() items: any[] | null | undefined;

  // PAGING - pass through for pager component
  @Input() count: number | null = null;
  @Input() page = 1;
  // tslint:disable-next-line:no-input-rename
  @Input('page-size') pageSize = 20;
  // tslint:disable-next-line:no-input-rename
  @Input('page-size-options') pageSizeOptions: MenuOption[] = [];
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageSizeChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() detailsOpened: EventEmitter<{item: any, open: boolean}> = new EventEmitter<{item: any, open: boolean}>();

  public tableViewSupported = false;
  public tilesViewSupported = false;
  public detailsSectionSupported = false;

  @Input() view = 'table';

  // SORTING - pass through for pager component
  // tslint:disable-next-line:no-input-rename
  @Input('sort-options') sortOptions: MenuOption[] = [];
  // tslint:disable-next-line:no-input-rename
  @Input('sort') sort: string | null = null;
  // tslint:disable-next-line:no-input-rename
  @Input('sort-dir') sortdir: string | null = '-';
  @Output() sortChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() sortdirChanged: EventEmitter<string> = new EventEmitter<string>();

  // COLUMNS
  public columns: any[] = [];
  @ContentChildren(ListColumnComponent, { read: ListColumnComponent })
  set cols(refs: QueryList<ListColumnComponent>) {
    this.columns = refs?.toArray();
    if (this.columns && this.columns.length > 0) {
      this.tableViewSupported = true;
    }
  }

  public tilesDeckClass = 'cards-deck-4';
  // tslint:disable-next-line:no-input-rename
  @Input('tiles-count') tilesCount = 4;

  public tileTemplate: any | null | undefined = null;
  @ContentChild(ListTileComponent, {read: ListTileComponent})
  set tiles(ref: ListTileComponent) {
    this.tileTemplate = ref;
    if (this.tileTemplate) {
      this.tilesViewSupported = true;
    }
  }

  public detailsTemplate: any | null | undefined = null;
  @ContentChild(ListDetailsSectionComponent, {read: ListDetailsSectionComponent})
  set details(ref: ListDetailsSectionComponent) {
    this.detailsTemplate = ref;
    if (this.detailsTemplate) {
      this.detailsSectionSupported = true;
    }
  }

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes);
    const tilesCountChange = changes['tiles-count'] || changes.tilesCount ;
    if (tilesCountChange) {
      this.setTilesDeckClass(tilesCountChange.currentValue);
    }
    const itemsChange = changes.items;
    if (itemsChange && itemsChange.currentValue) {
      // this.detailsState = new Array(itemsChange.currentValue.length);
    } else {
      // this.detailsState = [];
    }
  }

  // events
  public emitPageChanged($event: number): void  {
    this.pageChanged.emit($event);
  }

  public emitPageSizeChanged($event: number): void {
    this.pageSizeChanged.emit($event);
  }

  public emitSortChanged($event: string): void {
    this.sortChanged.emit($event);
  }
  public emitSortdirChanged($event: string): void {
    this.sortdirChanged.emit($event);
  }

  public toggleDetails(item: any): void {
    item.detailsExpanded = !item.detailsExpanded;
    this.detailsOpened.emit({ item, open: item.detailsExpanded });
  }

  // helpers
  private setTilesDeckClass(tiles: number): void {
    if ( tiles >= 1 && tiles <= 4 ) {
      this.tilesDeckClass = `cards-deck-${tiles}`;
    } else {
      this.tilesDeckClass = 'cards-deck-3';
    }
  }

}
