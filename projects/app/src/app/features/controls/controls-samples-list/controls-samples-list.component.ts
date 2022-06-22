import { BaseListComponent, Icons, ListViewType, MenuOption } from '@indice/ng-components';
import { Component, OnInit } from '@angular/core';
import { IResultSet, SwitchViewAction, RouterViewAction } from '@indice/ng-components';
import { Observable, of } from 'rxjs';
import { SampleViewModel } from '../../../models/sample.vm';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

export const ShellLayoutsListSamples = [
  new SampleViewModel(
    'Toaster service',
    'Toast notifications notifications',
    undefined, 'toaster')
];

@Component({
  selector: 'lib-controls-samples-list',
  templateUrl: './controls-samples-list.component.html',
  styleUrls: ['./controls-samples-list.component.css']
})
export class ControlsSamplesListComponent extends BaseListComponent<SampleViewModel> implements OnInit {
  newItemLink: string | null = null;
  public full = true;

  constructor(private route: ActivatedRoute, private router: Router) {
    super(route, router);
    this.view = ListViewType.Tiles;
    this.sort = 'title';
    this.sortdir = 'asc';
    this.search = '';
    this.pageSize = 10;
    this.sortOptions = [
      new MenuOption('Title', 'title'),
      new MenuOption('Description', 'description')
    ];
  }

  loadItems(): Observable<IResultSet<SampleViewModel> | null | undefined> {
    console.log('loadItems',this.sortdir);
    
    let items = Array(20).fill(ShellLayoutsListSamples[0]);
    return of({ count: items.length, items }).pipe(delay(1200));
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.actions = [];
    this.actions.push(new SwitchViewAction(ListViewType.Tiles, Icons.TilesView, 'switch to tiles view'));
    this.actions.push(new SwitchViewAction(ListViewType.Table, Icons.TableView, 'switch to table (grid) view'));
    this.actions.push(new SwitchViewAction(ListViewType.Gallery, Icons.ItemsCount, 'switch to gallery view'));
    this.actions.push(new RouterViewAction(Icons.Information, 'samples/shell-layout/info', 'rightpane', 'Πληροφορίες'));
  }
}
