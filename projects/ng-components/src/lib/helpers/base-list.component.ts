import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderMetaItem, IResultSet, MenuOption, RouterViewAction, ViewAction, ListViewType } from '../types';
import { Icons } from '../icons';

@Component({ template: '' })
export abstract class BaseListComponent<T> implements OnInit, OnDestroy {
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
  public sortOptions: MenuOption[] = [];
  public metaItems: HeaderMetaItem[] = [];
  public abstract newItemLink: string | null;
  private routeSub$: Subscription | undefined;

  constructor(private route$: ActivatedRoute, private router$: Router) {
  }

  ngOnDestroy(): void {
    if (this.routeSub$) {
      this.routeSub$.unsubscribe();
    }
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

    // disabled external route changes monitoring due to sync issues - which is bad :) - refresh from url will not work
    // until i come up with a solution...

    this.routeSub$ = this.route$.queryParamMap.subscribe(params => {
      if (params.keys.length === 0) {
        return;
      }

      // changing the view mode does not require reloading...
      this.view = params.get('view') || ListViewType.Tiles;
      console.log('route changes ', this.view);
      
      // const page = +(params.get('page') || 1);
      // if (page !== this.page) {
      //   this.page = page;
      // }

      // const size = +(params.get('pagesize') || 20);
      // if (this.pageSize !== size) {
      //   this.pageSize = size;
      // }

      // if (params.get('search') !== this.search) {
      //   this.search = params.get('search');
      // }

      // if (params.get('sort') !== this.sort) {
      //   this.sort = params.get('sort');
      // }

      // if (params.get('sortdir') !== this.sortdir) {
      //   this.sortdir = params.get('sortdir');
      // }

    });

    // just to sync params in query
    this.setRouteParams(true);
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
    if ($event.key === 'refresh') {
      this.refresh();
    }
  }

  private load(): void {
    console.log('BaseListComponent LOAD');
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

  public clear(): void {
    this.count = 0;
    this.page = 1;
    this.items = null;
    this.search = null;
    this.setRouteParams();
    this.load();
  }

  public refresh(): void {
    this.count = 0;
    this.page = 1;
    this.items = null;
    this.search = null;
    this.setRouteParams();
    this.load();
  }

  public pageChanged(page: number): void {
    if(this.page !== page) {
      this.page = page;
      this.setRouteParams();
      this.load();
    }
  }

  public pageSizeChanged(pageSize: number): void {
    if(this.pageSize !== pageSize) {
      this.pageSize = pageSize;
      this.page = 1;
      this.setRouteParams();
      this.refresh();
    }
  }

  public sortChanged(sort: string): void {
    console.log('base-list sortChanged', sort);
    if (this.sort !== sort) {
      this.page = 1;
      this.sort = sort;
      this.setRouteParams();
      this.refresh();
    }
  }

  public sortdirChanged(sortdir: string): void {
    if (this.sortdir !== sortdir) {
      this.page = 1;
      this.sortdir = sortdir;
      this.setRouteParams();
      this.refresh();
    }
  }

  public searchChanged(searchText: string | null): void {
    this.search = searchText;
    this.setRouteParams();
    this.refresh();
  }
}
