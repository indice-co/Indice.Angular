import { delay } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SampleViewModel } from '../../models/sample.vm';
import { FilterClause, Operators, SearchOption } from 'projects/ng-components/src/lib/controls/advanced-search/models';
import { BaseListComponent } from 'projects/ng-components/src/lib/helpers/base-list.component';
import { IResultSet, ListViewType, MenuOption } from 'projects/ng-components/src/public-api';

@Component({
  selector: 'app-advanced-search-playground',
  templateUrl: './advanced-search-playground.component.html'
})
export class AdvancedSearchPlaygroundComponent extends BaseListComponent<SampleViewModel> implements OnInit {
  newItemLink: string | null = null;
  public full = true;
  searchOptions: SearchOption[] = [
    {
      field: 'title',
      name: 'Τίτλος',
      dataType: 'string'
    },
    {
      field: 'description',
      name: 'Περιγραφή',
      dataType: 'string'
    },
    {
      field: 'dateRange',
      name: 'Ημ/νία υποβολής',
      dataType: 'daterange'
    },
    {
      field: 'status',
      name: 'Κατάσταση',
      dataType: 'array',
      options: [
        { value: 'Completed', label: 'Ολοκληρωμένο' },
        { value: 'Deleted', label: 'Διαγεγραμμένο' },
        { value: 'Submitted', label: 'Υποβεβλημένο' }
      ],
      multiTerm: true
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {
    super(route, router);
    this.view = ListViewType.Table;
    this.sort = 'title';
    this.sortdir = 'asc';
    this.search = '';
    this.pageSize = 10;
    this.sortOptions = [
      new MenuOption('Title', 'title'),
      new MenuOption('Description', 'description')
    ];
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.actions = [];
  }

  loadItems(): Observable<IResultSet<SampleViewModel> | null | undefined> {
    let title = this.filters?.find(f => f.member === 'title')?.value;
    let description = this.filters?.find(f => f.member === 'description')?.value;
    let from = new Date(this.filters?.find(f => f.member === 'dateRange' && f.operator === Operators.GREATER_THAN_EQUAL.value as FilterClause.Op)?.value);
    let to = new Date(this.filters?.find(f => f.member === 'dateRange' && f.operator === Operators.LESS_THAN_EQUAL.value as FilterClause.Op)?.value);
    let status: string[] = [];
    this.filters?.filter(f => f.member === 'status')?.forEach(f => status.push(f.value));
    console.log('title: ' + title);
    console.log('description: ' + description);
    console.log('from: ' + from);
    console.log('to: ' + to);
    console.log('status: ' + status);
    let items = Array(20).fill(ShellLayoutsListSamples[0]);
    return of({ count: items.length, items }).pipe(delay(1200));
  }

}

export const ShellLayoutsListSamples = [
  new SampleViewModel(
    'Toaster service',
    'Toast notifications notifications',
    undefined, 'toaster')
];
