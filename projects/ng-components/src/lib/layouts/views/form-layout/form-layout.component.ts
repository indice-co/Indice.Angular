import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { SidePaneComponent } from '../../../controls/side-pane/side-pane.component';
import { RouterViewAction, ViewAction } from '../../../types';

@Component({ selector: 'lib-form-layout', templateUrl: './form-layout.component.html', standalone: false })
export class FormLayoutComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @ViewChild('search') private searchInput$?: ElementRef;
  @ViewChild('formPane') formPane: SidePaneComponent | undefined;
  @Input() title: string | null = null;
  @Input() image: string | null = null;
  @Input() icon: string | null = null;
  // tslint:disable-next-line:no-input-rename
  @Input('search-placeholder') searchPlaceholder: string | null = 'αναζήτηση'
  @Input() actions: ViewAction[] | null = null;
  // tslint:disable-next-line:no-input-rename
  @Input('sub-title') subTitle: string | null = null;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onAction: EventEmitter<ViewAction> = new EventEmitter<ViewAction>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() onComplete: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router$: Router) { }

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

  searchActionClick(action: ViewAction, text: string): void {
    this.onSearch.emit(text);
  }

  searchActionType(text: string): void {
    this.onSearch.emit(this.searchInput$?.nativeElement.value);
  }

  public routerLinkActionClick(action: RouterViewAction | any, relative: boolean = false): void {
    if (action.outlet) {
      this.router$.navigate(['', { outlets: { formRightPane: action.link } }]);
    } else {
      this.router$.navigate([action.link]);
    }
  }

  public onSidePaneDeactivated($event: any): void {
    this.formPane?.onSidePaneDeactivated($event);
    this.onComplete.emit(true);
  }

  public onSidePaneActivated($event: any): void {
    this.formPane?.onSidePaneActivated($event);
  }

}
