import { Component, OnInit, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
    selector: 'lib-list-view-empty-state',
    templateUrl: './list-view-empty-state.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListViewEmptyStateComponent implements OnInit {

  readonly title = input('No records found.');
  // tslint:disable-next-line:no-input-rename
  readonly subTitle = input('Please change your search criteria or start by adding a new record', { alias: "sub-title" });
  // tslint:disable-next-line:no-input-rename
  readonly newItemLabel = input('New record', { alias: "new-item-label" });
  constructor() { }

  ngOnInit(): void {
  }

}
