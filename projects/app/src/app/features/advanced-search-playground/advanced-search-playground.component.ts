import { delay } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IResultSet, ListViewType, MenuOption } from '@indice/ng-components';
import { Observable, of } from 'rxjs';
import { SampleViewModel } from '../../models/sample.vm';
import { FilterClause, SearchOption } from 'projects/ng-components/src/lib/controls/advanced-search/models';
import { BaseListComponent } from 'projects/ng-components/src/lib/helpers/base-list.component';

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
