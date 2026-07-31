import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'lib-list-view-empty-state',
    templateUrl: './list-view-empty-state.component.html',
    changeDetection: ChangeDetectionStrategy.Eager
})
export class ListViewEmptyStateComponent implements OnInit {

  @Input() title = 'No records found.';
  // tslint:disable-next-line:no-input-rename
  @Input('sub-title') subTitle = 'Please change your search criteria or start by adding a new record';
  // tslint:disable-next-line:no-input-rename
  @Input('new-item-label') newItemLabel = 'New record';
  constructor() { }

  ngOnInit(): void {
  }

}
