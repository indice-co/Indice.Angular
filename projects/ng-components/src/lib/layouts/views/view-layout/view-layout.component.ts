import { SwitchViewAction } from '../../../types';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { HeaderMetaItem, RouterViewAction, ViewAction } from '../../../types';

@Component({
  selector: 'lib-view-layout',
  templateUrl: './view-layout.component.html'
})
export class ViewLayoutComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @ViewChild('search') private searchInput$?: ElementRef;
  // tslint:disable-next-line:no-input-rename
  @Input('show-header') header = true;
  @Input() fluid = false;
  @Input() title = 'no title';
  @Input() icon: string | null = null;
  @Input() actions: ViewAction[] | null = null;
  @Input() busy = false;
  // tslint:disable-next-line:no-input-rename
  @Input('search-placeholder') searchPlaceholder: string | null = 'αναζήτηση';
  @Input() view: string | null = null;
  // tslint:disable-next-line:no-input-rename
  @Input('meta-items') metaItems: HeaderMetaItem[] | null = [];
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onAction: EventEmitter<ViewAction> = new EventEmitter<ViewAction>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor(private route$: ActivatedRoute, private router$: Router) { }

  ngOnInit(): void { }

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
    fromEvent(this.searchInput$?.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value; // Get input value.
      }),
      filter(inputValue => inputValue.length >= 3 || inputValue.length === 0),
      // If character length greater than minimumSearchCharacters setting.
      debounceTime(1000), // Time in milliseconds between key events.
      distinctUntilChanged() // If previous query is different from current.
    ).subscribe(_ => {
      this.onSearch.emit(this.searchInput$?.nativeElement.value);
    });
  }

  public switchViewActionClick(action: SwitchViewAction | any): void {
    // console.log('switchViewActionClick', action);
    this.view = action.param;
    if (action && action.param) {
      this.router$.navigate([], { queryParams: { view: action.param }, queryParamsHandling: 'merge', skipLocationChange: false });
    }
  }
}
