import { Component, ContentChild, ContentChildren, Input, QueryList, OnChanges, SimpleChanges, ChangeDetectionStrategy, input, output } from '@angular/core';
import { FilterClause, SearchOption } from '../advanced-search/models';
import { ListViewType, MenuOption, PagerPosition } from '../../types';
import { ListColumnComponent } from './list-column.component';
import { ListTileComponent } from './list-tile.component';
import { ListDetailsSectionComponent } from './list-details-section.component';
import { Icons } from '../../icons';
import { NgIf, NgSwitch, NgSwitchCase, NgFor, NgTemplateOutlet, NgSwitchDefault } from '@angular/common';
import { AdvancedSearchComponent } from '../advanced-search/advanced-search.component';
import { PagerComponent } from '../pager/pager.component';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';
import { ListViewEmptyStateComponent } from './list-view-empty-state.component';
;

@Component({
    selector: 'lib-list-view',
    templateUrl: './list-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgIf, AdvancedSearchComponent, PagerComponent, NgSwitch, NgSwitchCase, SkeletonLoaderComponent, NgFor, NgTemplateOutlet, NgSwitchDefault, ListViewEmptyStateComponent]
})
export class ListViewComponent implements OnChanges {
  @Input('search-options') searchOptions: SearchOption[] = [];
  readonly filters = input<FilterClause[]>([]);
  // BUSY STATE
  readonly busy = input(false);
  // DATA SOURCE!
  @Input() items: any[] | null | undefined;
  // PAGING - pass through for pager component
  readonly count = input<number | null>(null);
  readonly page = input(1);
  readonly view = input(ListViewType.Table);
  readonly sort = input<string | null>(null);
   readonly pageSize = input(20, { alias: "page-size" });
   readonly pageSizeOptions = input<MenuOption[]>([], { alias: "page-size-options" });
  // SORTING - pass through for pager component
   readonly sortOptions = input<MenuOption[]>([], { alias: "sort-options" });
  readonly operatorsDisabled = input<boolean>(false, { alias: "operators-disabled" });
   readonly sortdir = input<string | null>('-', { alias: "sort-dir" });
   readonly tilesCount = input(4, { alias: "tiles-count" });
   readonly showPager = input(true, { alias: "show-pager" });
   @Input('pager-position') pagerPosition: any | undefined = PagerPosition.Top;
  // DETAILS SECTION
  // Check if details section and button should be displayed according to the count of the value given
   readonly detailsSectionPropertyCount = input<string | null>(null, { alias: "details-section-property-count" });
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

  readonly pageChanged = output<number>();
  readonly pageSizeChanged = output<number>();
  readonly detailsOpened = output<{
    item: any;
    open: boolean;
}>();
  readonly sortChanged = output<string>();
  readonly sortdirChanged = output<string>();
  readonly advancedSearchChanged = output<FilterClause[]>();

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
        this.view() !== ListViewType.Gallery
          ? `cards-deck-${tiles}`
          : this.items && this.items.length > 0
            ? `gallery-deck-${tiles}`
            : 'gallery-deck';
    } else {
      this.tilesDeckClass =
        this.view() !== ListViewType.Gallery
          ? 'cards-deck-3'
          : this.items && this.items.length > 0
            ? 'gallery-deck-3'
            : 'gallery-deck';
    }
  }
}
