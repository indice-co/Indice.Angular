import { SwitchViewAction } from '../../../types';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, input, output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { HeaderMetaItem, RouterViewAction, ViewAction } from '../../../types';
import { NgClass } from '@angular/common';

@Component({
    selector: 'lib-view-layout',
    templateUrl: './view-layout.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NgClass]
})
export class ViewLayoutComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @ViewChild('search') private searchInput$?: ElementRef;
  // tslint:disable-next-line:no-input-rename
  readonly header = input(true, { alias: "show-header" });
  readonly fluid = input(false);
  readonly title = input('no title');
  @Input() icon: string | null = null;
  readonly actions = input<ViewAction[] | null>(null);
  readonly busy = input(false);
  // tslint:disable-next-line:no-input-rename
  readonly searchPlaceholder = input<string | null>('search', { alias: "search-placeholder" });
  @Input() view: string | null = null;
  // tslint:disable-next-line:no-input-rename
  @Input('meta-items') metaItems: HeaderMetaItem[] | null = [];
  // tslint:disable-next-line:no-output-on-prefix
  readonly onAction = output<ViewAction>();
  // tslint:disable-next-line:no-output-on-prefix
  readonly onSearch = output<string>();

  constructor(private route$: ActivatedRoute, private router$: Router) { }

  ngOnInit(): void {
    if (this.searchInput$?.nativeElement){
      fromEvent(this.searchInput$.nativeElement, 'keyup').pipe(
        map((event: any) => {
          return event.target.value; // Get input value.
        }),
        filter(inputValue => inputValue.length >= 3 || inputValue.length === 0),
        // If character length greater than minimumSearchCharacters setting.
        debounceTime(1000), // Time in milliseconds between key events.
        distinctUntilChanged() // If previous query is different from current.
      ).subscribe();
    }
  }

  public emitActionClick(action: ViewAction): void {
    this.onAction.emit(action);
  }

  public routerLinkActionClick(action: RouterViewAction | any): void {
    // console.log('routerLinkActionClick', action);
    if (action.outlet) {
      this.router$.navigate(['', { outlets: { rightpane: action.link } }]);
    } else {
      this.router$.navigate([action.link]);
    }
  }

  searchActionClick(action: ViewAction, text: string): void {
    this.onSearch.emit(text);
  }

  searchActionType(text: string): void {
    this.onSearch.emit(this.searchInput$?.nativeElement.value);
  }

  public handleClear(event: any): void {
    console.log('handle clear!!!');
    event.stopPropagation();
    this.onSearch.emit(event.target?.value);
  }

  public switchViewActionClick(action: SwitchViewAction | any): void {
    // console.log('switchViewActionClick', action);
    this.view = action.param;
    if (action && action.param) {
      this.router$.navigate([], { queryParams: { view: action.param }, queryParamsHandling: 'merge', skipLocationChange: false });
    }
  }
}
