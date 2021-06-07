import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Icons } from '../../icons';
import { MenuOption } from '../../types';

@Component({
  selector: 'lib-pager',
  templateUrl: './pager.component.html'
})
export class PagerComponent implements OnInit, OnChanges {
  // PAGING
  @Input() count: number | null = null;
  @Input() page = 1;
  // tslint:disable-next-line:no-input-rename
  @Input('page-size') pageSize = 20;
  // tslint:disable-next-line:no-input-rename
  @Input('page-size-options') pageSizeOptions: MenuOption[] = [
    new MenuOption('10', 10),
    new MenuOption('20', 20),
    new MenuOption('30', 30),
    new MenuOption('50', 50),
    new MenuOption('100', 100)
  ];
  public pages: MenuOption[] = [];
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageSizeChanged: EventEmitter<number> = new EventEmitter<number>();
  public canPreviousPage = false;
  public canNextPage = false;

  // SORTING
  // tslint:disable-next-line:no-input-rename
  @Input('sort-options') sortOptions: MenuOption[] = [];
  // tslint:disable-next-line:no-input-rename
  @Input('sort') sort: string | null = null;
  // tslint:disable-next-line:no-input-rename
  @Input('sort-dir') sortdir: string | null = 'desc';
  @Output() sortChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() sortdirChanged: EventEmitter<string> = new EventEmitter<string>();
  public sortdirIcon = Icons.SortDesc;

  constructor(private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.calcPages();
  }

  ngOnInit(): void {
  }

  private calcPages(): void {
    this.pages = [];
    if (this.count && this.count > 0) {
      const pageCount = this.count / this.pageSize;
      for (let i = 0; i < pageCount; i++) {
        this.pages.push(new MenuOption(i + 1 + '', i + 1));
      }
    }
    this.canPreviousPage = this.page > 1;
    this.canNextPage = this.page < this.pages.length;
    console.log('calcPages', this.page, this.canPreviousPage, this.canNextPage);
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
    console.log('toggleSortdir');
    let sortdir = 'desc';
    if (this.sortdir === 'desc') {
      sortdir = 'asc';
      this.sortdirIcon = Icons.SortAsc;
    } else {
      sortdir = 'desc';
      this.sortdirIcon = Icons.SortDesc;
    }
    this.sortdirChanged.emit(sortdir);
  }

}
