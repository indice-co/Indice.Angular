import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderMetaItem, IResultSet, MenuOption, RouterViewAction, ViewAction } from '../types';
import { Icons } from '../icons';

@Component({ template: '' })
export abstract class BaseListComponent<T> implements OnInit {
  public items: T[] | null | undefined = null;
  public view: string = ListViewType.Tiles;
  public title: string | null = null;
  public actions: ViewAction[] = [];
  public loaderItems: any[] = [1, 2, 3, 4, 5];
  public page = 1;
  public pageSize = 20;
  public count = 0;
  public sort: string | null = '';
  public sortdir: string | null = '-';
  public search: string | null = '';
  public sortOptions: MenuOption[] | null = null;
  public metaItems: HeaderMetaItem[] | null = [];
  public abstract newItemLink: string | null;

  constructor(private route$: ActivatedRoute, private router$: Router) {
  }

  ngOnInit(): void {
    this.actions = [
      new ViewAction('search', null, null, Icons.Search, 'αναζήτηση'),
      new ViewAction('refresh', null, null, Icons.Refresh, 'ανανέωση στοιχείων')
    ];
    if (this.newItemLink) {
      this.actions.push(new RouterViewAction(Icons.Add, this.newItemLink, 'rightpane', 'προσθήκη νέας εγγραφής;'));
    }

    this.metaItems = [
      { key: 'count', icon: Icons.ItemsCount, text: 'παρακαλώ περιμένετε...' }
    ];

    console.log('base list params init');
    this.route$.queryParams.subscribe(params => {
      console.log('base list params', params);
      if (params.view) { this.view = params.view; }
      if (params.page) { this.page = +params.page; }
      if (params.pagesize) { this.pageSize = +params.pagesize; }
      if (params.search) { this.search = params.search; }
      if (params.sort) { this.sort = params.sort; }
      if (params.dir) { this.sortdir = params.dir; }
      this.load();
    });
    // just to sync params in query
    this.setRouteParams(true);
    // and load data :)
    this.load();
  }

  private setRouteParams(locationChange: boolean = false): void {
    this.router$.navigate([], {
      relativeTo: this.route$, queryParams: {
        view: this.view,
        page: this.page,
        pagesize: this.pageSize,
        search: this.search,
        sort: this.sort,
        dir: this.sortdir
      }, queryParamsHandling: 'merge', skipLocationChange: locationChange
    });
  }

  public actionHandler($event: ViewAction): void {
    console.log('BaseListComponent actionHandler', $event);
    if($event.key === 'refresh') {
      this.refresh();
    }
  }

  public setView(view: string): void {
    this.view = view;
    this.setRouteParams();
  }

  private load(): void {
    this.count = 0;
    this.items = null;
    this.loadItems().subscribe(result => {
      this.count = result ? result.count : 0;
      this.items = result?.items;
      this.updateHeaderMeta();
    });
  }

  private updateHeaderMeta(): void {
    const count = this.metaItems?.filter(m => m.key === 'count')[0];
    if (count) {
      count.text = `${this.count} αποτελέσματα`;
    }
  }

  public abstract loadItems(): Observable<IResultSet<T> | null | undefined>;

  public refresh(): void {
    this.count = 0;
    this.page = 1;
    this.items = null;
    this.search = null;
    // https://stackoverflow.com/questions/46213737/angular-append-query-parameters-to-url
    this.setRouteParams();
  }

  public pageChanged(page: number): void {
    this.page = page;
    this.setRouteParams();
  }

  public pageSizeChanged(pageSize: number): void {
    this.pageSize = pageSize;
    this.page = 1;
    this.setRouteParams();
  }

  public sortChanged(sort: string): void {
    console.log('base-list sortChanged', sort);
    this.page = 1;
    this.sort = sort;
    this.setRouteParams();
  }

  public sortdirChanged(sortdir: string): void {
    console.log('base-list sortdirChanged', sortdir);
    this.page = 1;
    this.sortdir = sortdir;
    this.setRouteParams();
  }

  public searchChanged(searchText: string | null): void {
    this.search = searchText;
    this.setRouteParams();
  }
}

export class ListViewType {
  public static Tiles = 'tiles';
  public static Table = 'table';
  public static Map = 'map';
}
