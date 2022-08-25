import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaseListComponent, HeaderMetaItem, IResultSet, ListViewType } from '@indice/ng-components';
import { SampleViewModel } from '../../../models/sample.vm';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export const ViewLayoutsListSamples = [
  new SampleViewModel(
    'ModelViewLayoutComponent',
    'Layout for all model views in our application, contains a left pane navigation component with placehodlers for form components',
    undefined, 'model-view')
];

@Component({
  selector: 'lib-view-layouts-list',
  templateUrl: './view-layouts-list.component.html',
  styleUrls: ['./view-layouts-list.component.css']
})
export class ViewLayoutsListComponent extends BaseListComponent<SampleViewModel> implements OnInit {
  newItemLink: string | null = null;
  busy = true;

  loadItems(): Observable<IResultSet<SampleViewModel> | null | undefined> {
    return of({count: ViewLayoutsListSamples.length, items: ViewLayoutsListSamples }).pipe(delay(1000));
  }

  constructor(private route: ActivatedRoute, private router: Router) {
    super(route, router);
    this.view = ListViewType.Tiles;
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
