import { Component, ContentChild, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { MenuOption } from '../../types';
import { ListTileComponent } from './list-tile.component';
import { ListColumnComponent } from './list-column.component';

@Component({
  selector: 'lib-list-view',
  templateUrl: './list-view.component.html'
})
export class ListViewComponent implements OnInit {
  // PAGING - pass through for pager component
  @Input() count: number | null = null;
  @Input() page = 1;
  // tslint:disable-next-line:no-input-rename
  @Input('page-size') pageSize = 20;
  // tslint:disable-next-line:no-input-rename
  @Input('page-size-options') pageSizeOptions: MenuOption[] = [];
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageSizeChanged: EventEmitter<number> = new EventEmitter<number>();

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
  private cols$: QueryList<ListColumnComponent> | null = null;
  @Input() items: any[] | null | undefined;
  @ContentChildren(ListColumnComponent, { read: ListColumnComponent })
  set cols(refs: QueryList<ListColumnComponent>) {
    this.cols$ = refs;
    this.columns = this.cols$.toArray();
  }
  public tile: any | null | undefined = null;
  private tiles$: QueryList<ListTileComponent> | null = null;
  @ContentChild(ListTileComponent, {read: ListTileComponent})
  set tiles(refs: QueryList<ListTileComponent>) {
    this.tiles$ = refs;
    this.tile = this.tiles$.toArray()[0];
  }
  constructor() { }

  ngOnInit(): void {
  }


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
}
