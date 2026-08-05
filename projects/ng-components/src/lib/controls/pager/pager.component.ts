import { Component, Input, OnChanges, OnInit, SimpleChanges, ChangeDetectionStrategy, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { Icons } from '../../icons';
import { MenuOption } from '../../types';
import { DropDownMenuComponent } from '../drop-down-menu/drop-down-menu.component';

@Component({
    selector: 'lib-pager',
    templateUrl: './pager.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [DropDownMenuComponent]
})
export class PagerComponent implements OnInit, OnChanges {
  // BUSY STATE
  readonly busy = input(false);
  // PAGING
  readonly count = input<number | null>(null);
  @Input() page = 1;
  // tslint:disable-next-line:no-input-rename
  readonly pageSize = input(20, { alias: "page-size" });
  // tslint:disable-next-line:no-input-rename
  readonly pageSizeOptions = input<MenuOption[]>([
    new MenuOption('10', 10),
    new MenuOption('20', 20),
    new MenuOption('30', 30),
    new MenuOption('50', 50),
    new MenuOption('100', 100)
], { alias: "page-size-options" });
  public pages: MenuOption[] = [];
  readonly pageChanged = output<number>();
  readonly pageSizeChanged = output<number>();
  public canPreviousPage = false;
  public canNextPage = false;

  // SORTING
  // tslint:disable-next-line:no-input-rename
  @Input('sort-options') sortOptions: MenuOption[] = [];
  // tslint:disable-next-line:no-input-rename
  readonly sort = input<string | null>(null);
  // tslint:disable-next-line:no-input-rename
  readonly sortdir = input<string | null>('desc', { alias: "sort-dir" });
  readonly sortChanged = output<string>();
  readonly sortdirChanged = output<string>();
  public sortdirIcon = Icons.SortDesc;

  constructor(private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.calcPages();
  }

  ngOnInit(): void {
  }

  private calcPages(): void {
    this.pages = [];
    const count = this.count();
    if (count && count > 0) {
      const pageCount = count / this.pageSize();
      for (let i = 0; i < pageCount; i++) {
        this.pages.push(new MenuOption(i + 1 + '', i + 1));
      }
    }
    this.canPreviousPage = this.page > 1;
    this.canNextPage = this.page < this.pages.length;
  }

  public nextPage(): void {
    const next = this.page + 1;
    this.gotoPage(next);
  }

  public previousPage(): void {
    const previous = this.page - 1;
    this.gotoPage(previous);
  }

  public gotoPage(page: number): void {
    this.page = page;
    this.pageChanged.emit(page);
    this.calcPages();
  }

  public pageSizeOptionChanged(pageSize: number): void {
    this.pageSizeChanged.emit(pageSize);
    this.calcPages();
  }

  public pageOptionChanged(page: number): void {
    this.pageChanged.emit(page);
    this.calcPages();
  }

  public sortOptionChanged(sort: string): void {
    this.sortChanged.emit(sort);
  }

  public toggleSortdir(): void {
    let sortdir = 'desc';
    if (this.sortdir() === 'desc') {
      sortdir = 'asc';
      this.sortdirIcon = Icons.SortAsc;
    } else {
      sortdir = 'desc';
      this.sortdirIcon = Icons.SortDesc;
    }
    this.sortdirChanged.emit(sortdir);
  }

}
