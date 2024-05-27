import { Component, ContentChild, ContentChildren, EventEmitter, Input, Output, QueryList, OnChanges, SimpleChanges } from '@angular/core';
import { MenuOption, ListViewType, PagerPosition } from '../../types';
import { ListTileComponent } from './list-tile.component';
import { ListColumnComponent } from './list-column.component';
import { ListDetailsSectionComponent } from './list-details-section.component';
import { Icons } from '../../icons';
import { FilterClause, SearchOption } from '../advanced-search/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-list-view',
  templateUrl: './list-view.component.html'
})
export class ListViewComponent implements OnChanges {
  @Input('search-options$') searchOptions$: Observable<SearchOption[]> | undefined;
  @Input() filters: FilterClause[] = [];
  // BUSY STATE
  @Input() busy = false;
  // DATA SOURCE!
  @Input() items: any[] | null | undefined;
  // PAGING - pass through for pager component
  @Input() count: number | null = null;
  @Input() page = 1;
  @Input() view = ListViewType.Table;
  @Input() sort: string | null = null;
  // tslint:disable-next-line:no-input-rename
  @Input('page-size') pageSize = 20;
  // tslint:disable-next-line:no-input-rename
  @Input('page-size-options') pageSizeOptions: MenuOption[] = [];
  // SORTING - pass through for pager component
  // tslint:disable-next-line:no-input-rename
  @Input('sort-options') sortOptions: MenuOption[] = [];
  @Input('operators-disabled') operatorsDisabled: boolean = false;
  // tslint:disable-next-line:no-input-rename
  @Input('sort-dir') sortdir: string | null = '-';
  // tslint:disable-next-line:no-input-rename
  @Input('tiles-count') tilesCount = 4;
  // tslint:disable-next-line:no-input-rename
  @Input('show-pager') showPager = true;
  // tslint:disable-next-line:no-input-rename
  @Input('pager-position') pagerPosition: any | undefined = PagerPosition.Top;
  // DETAILS SECTION
  // Check if details section and button should be displayed according to the count of the value given
  // tslint:disable-next-line:no-input-rename
  @Input('details-section-property-count') detailsSectionPropertyCount: string | null = null;
  // COLUMNS
  @ContentChildren(ListColumnComponent, { read: ListColumnComponent })
  set cols(refs: QueryList<ListColumnComponent>) {
    this.columns = refs?.toArray();
    if (this.columns && this.columns.length > 0) {
      this.tableViewSupported = true;
    }
    this.multipleFullWidth = this.columns.filter(c => c.fullWidth).length > 1;
    this.fullWidthTHClass = this.multipleFullWidth ? 'list-view-th-half' : 'list-view-th-full';
    this.fullWidthTDClass = this.multipleFullWidth ? 'list-view-td-half' : 'list-view-td-full';
  }
  // tslint:disable-next-line:no-input-rename
  @ContentChild(ListTileComponent, { read: ListTileComponent })
  set tiles(ref: ListTileComponent) {
    this.tileTemplate = ref;
    if (this.tileTemplate) {
      this.tilesViewSupported = true;
    }
  }

  @ContentChild(ListDetailsSectionComponent, { read: ListDetailsSectionComponent })
  set details(ref: ListDetailsSectionComponent) {
    this.detailsTemplate = ref;
    if (this.detailsTemplate) {
      this.detailsSectionSupported = true;
    }
  }

  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageSizeChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() detailsOpened: EventEmitter<{ item: any, open: boolean }> = new EventEmitter<{ item: any, open: boolean }>();
  @Output() sortChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() sortdirChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() advancedSearchChanged: EventEmitter<FilterClause[]> = new EventEmitter<FilterClause[]>();

  private multipleFullWidth = false;
  public expandIcon = Icons.Expand;
  public collapseIcon = Icons.Collapse;
  public tableViewSupported = false;
  public fullWidthTHClass = 'list-view-th-full';
  public fullWidthTDClass = 'list-view-td-full';
  public tilesViewSupported = false;
  public detailsSectionSupported = false;
  public loaderItems: any[] = [];
  public columns: any[] = [];
  public tilesDeckClass = 'cards-deck-4';
  public tileTemplate: any | null | undefined = null;
  public detailsTemplate: any | null | undefined = null;

  constructor() {
    for (let i = 0; i < 9; i++) {
      this.loaderItems.push({});
    }
    if (this.pagerPosition) {
      this.pagerPosition = this.pagerPosition as PagerPosition;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const tilesCountChange = changes['tiles-count'] || changes.tilesCount;
    if (tilesCountChange) {
      this.setTilesDeckClass(tilesCountChange.currentValue);
    }
  }

  // events
  public emitPageChanged($event: number): void {
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
  public emitAdvancedSearchChanged($event: FilterClause[]): void {
    this.advancedSearchChanged.emit($event);
  }

  public toggleDetails(item: any): void {
    item.detailsExpanded = !item.detailsExpanded;
    this.detailsOpened.emit({ item, open: item.detailsExpanded });
  }

  // helpers
  private setTilesDeckClass(tiles: number): void {
    if (tiles >= 1 && tiles <= 4) {
      this.tilesDeckClass =
        this.view !== ListViewType.Gallery
          ? `cards-deck-${tiles}`
          : this.items && this.items.length > 0
            ? `gallery-deck-${tiles}`
            : 'gallery-deck';
    } else {
      this.tilesDeckClass =
        this.view !== ListViewType.Gallery
          ? 'cards-deck-3'
          : this.items && this.items.length > 0
            ? 'gallery-deck-3'
            : 'gallery-deck';
    }
  }

}
