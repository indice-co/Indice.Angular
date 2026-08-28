import { FilterClause, QueryParameters, SearchOption } from './../controls/advanced-search/models';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChangeDetectorRef, Component, DestroyRef, OnInit, ChangeDetectionStrategy, inject, input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HeaderMetaItem, IResultSet, MenuOption, RouterViewAction, ViewAction, ListViewType } from '../types';
import { Icons } from '../icons';

@Component({
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
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
  public sortdir: string | null = '';
  public search: string | null = '';
  public filters: FilterClause[] = [];
  public searchOptions: SearchOption[] = [];
  public sortOptions: MenuOption[] = [];
  public metaItems: HeaderMetaItem[] = [];
  public singularResult = 'result';
  public pluralResults = 'results';
  public abstract newItemLink: string | null;
  public minimumSearchCharacters = 3;
  public searchDebounceTime = 300;
  private searchSubject$ = new Subject<string | null>();
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);
  readonly autoLoad = input<boolean>(true, { alias: "auto-load" });

  constructor(private route$: ActivatedRoute, private router$: Router) {
  }

  public getViewActions(): Observable<ViewAction[]> {
    const actions = [
      new ViewAction('search', null, null, Icons.Search, 'search'),
      new ViewAction('refresh', null, null, Icons.Refresh, 'refresh')
    ];
    if (this.newItemLink) {
      actions.push(new RouterViewAction(Icons.Add, this.newItemLink, 'rightpane', 'add a new record'));
    }
    return of(actions);
  }

  ngOnInit(): void {
    this.getViewActions().subscribe(actions => {
      this.actions = actions || [];
    });

    this.metaItems = [
      { key: 'count', icon: Icons.ItemsCount, text: 'please wait...' }
    ];

    this.searchSubject$.pipe(
      filter(value => (value?.length ?? 0) >= this.minimumSearchCharacters || (value?.length ?? 0) === 0),
      debounceTime(this.searchDebounceTime),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(searchText => {
      this.executeSearch(searchText);
    });

    // disabled external route changes monitoring due to sync issues - which is bad :) - refresh from url will not work
    // until i come up with a solution...

    this.route$.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      if (params.keys.length === 0) {
        return;
      }

      // changing the view mode does not require reloading...
      this.view = params.get('view') || ListViewType.Tiles;
      // console.log('route changes ', this.view);

      if (params.get('search') !== null && params.get('search') !== this.search) {
        this.searchChanged(params.get('search'));
      }

      const page = +(params.get('page') || 1);
      if (page !== this.page) {
        this.page = page;
      }

      const size = +(params.get('pagesize') || 20);
      if (this.pageSize !== size) {
        this.pageSize = size;
      }

      if (params.get('search') && (params.get('search') !== this.search)) {
        this.search = params.get('search');
      }

      if (params.get('sort') && (params.get('sort') !== this.sort)) {
        this.sort = params.get('sort');
      }

      if (params.get('dir') && (params.get('dir') !== this.sortdir)) {
        this.sortdir = params.get('dir');
      }
      // initialize filters that may reside in the query string
      this.filters = this.getFiltersFrom(params);
      this.cdr.markForCheck();
    });
    // just to sync params in query
    this.setRouteParams(true);
    if(this.autoLoad()) this.load();
  }

  /**
 * Get filters from a querystring
 * @param queryParamMap
 * @returns filters found from a paramMap
 */
  private getFiltersFrom(queryParamMap: ParamMap): FilterClause[] {
    const filterResult: FilterClause[] = [];
    if (queryParamMap.has(QueryParameters.FILTER) && queryParamMap.get(QueryParameters.FILTER)!.length > 0) {
      const filterValue = queryParamMap.get(QueryParameters.FILTER);
      const filterValues = filterValue?.split(","); // we may have multiple filters in filter query param
      if (filterValues && filterValues.length > 0) {
        // create the filterClauses derived from the query params
        for (const index in filterValues) {
          const filterClause = FilterClause.parse(filterValues[index]);
          const parsed = new FilterClause(filterClause!.member, filterClause!.value, filterClause!.operator, filterClause!.dataType, this.searchOptions);
          if (parsed !== undefined) {
            filterResult.push(parsed);
          }
        }
      }
    }
    return filterResult;
  }

  private setRouteParams(locationChange = false): void {
    this.router$.navigate([], {
      relativeTo: this.route$, queryParams: {
        view: this.view,
        page: this.page,
        pagesize: this.pageSize,
        search: this.search,
        sort: this.sort,
        dir: this.sortdir,
        filter: this.filterClausesToString(this.filters)
      }, queryParamsHandling: 'merge', skipLocationChange: locationChange
    });
  }

  private filterClausesToString(filters: FilterClause[] | undefined) {
    return filters?.map((f: FilterClause) => {
      if (f.dataType === 'datetime') {
        f.value = (new Date(f.value)).toISOString();
      }
      return f.toString();
    }).join(',');
  }

  public actionHandler($event: ViewAction): void {
    // console.log('BaseListComponent actionHandler', $event);
    if ($event.key === 'refresh') {
      this.refresh();
    }
  }

  private load(): void {
    // console.log('BaseListComponent LOAD');
    this.count = 0;
    this.items = null;
    this.loadItems().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(result => {
      this.count = result ? result.count : 0;
      this.items = result?.items;
      this.updateHeaderMeta();
    }, err => {
      this.count = 0;
      this.items = null;
      this.updateHeaderMeta();
    });
  }

  private updateHeaderMeta(): void {
    const count = this.metaItems?.filter(m => m.key === 'count')[0];
    if (count) {
      this.count === 1 ? count.text = `${this.count} ${this.singularResult}` : count.text = `${this.count} ${this.pluralResults}`;
    }
    this.cdr.markForCheck();
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
    this.updateHeaderMeta();
    this.page = 1;
    this.items = null;
    this.setRouteParams();
    this.load();
  }

  public pageChanged(page: number): void {
    if (this.page !== page) {
      this.page = page;
      this.setRouteParams();
      this.load();
    }
  }

  public pageSizeChanged(pageSize: number): void {
    if (this.pageSize !== pageSize) {
      this.pageSize = pageSize;
      this.page = 1;
      this.setRouteParams();
      this.refresh();
    }
  }

  public sortChanged(sort: string): void {
    // console.log('base-list sortChanged', sort);
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

  public advancedSearchChanged(filters: FilterClause[]): void {
    this.count = 0;
    this.page = 1;
    this.items = null;
    this.filters = filters;
    this.setRouteParams();
    this.load();
  }

  public searchChanged(searchText: string | null): void {
    this.searchSubject$.next(searchText);
  }

  private executeSearch(searchText: string | null): void {
    this.count = 0;
    this.page = 1;
    this.items = null;
    this.search = searchText;
    this.setRouteParams();
    this.load();
  }
}
