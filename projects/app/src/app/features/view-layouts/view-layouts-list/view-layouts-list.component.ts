import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaseListComponent, HeaderMetaItem, IResultSet, ListViewType } from '@indice/ng-components';
import { SampleViewModel } from '../../../models/sample.vm';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export const ViewLayoutsListSamples = [
  new SampleViewModel(
    'ViewLayoutComponent',
    'Layout for all views in our application, contains a header component with placehodlers for actions and search',
    undefined, ''),

  new SampleViewModel(
    'ModelViewLayoutComponent',
    'Layout for all model views in our application, contains a left pane navigation component with placehodlers for form components',
    undefined, ''),

  new SampleViewModel(
    'FormLayoutComponent',
    'Form Layout for all our CRUD forms in our application, contains a header component with placehodlers for actions and search as well as an actions footer element for save, cancel etc.',
    undefined, ''),

  new SampleViewModel(
      'SideViewComponent',
      'Side View Layout (aside) for all views in our application that appear in the aside section of our shell, contains a header component with placehodlers for actions and search.',
      undefined, ''),

];

@Component({
  selector: 'lib-view-layouts-list',
  templateUrl: './view-layouts-list.component.html',
  styleUrls: ['./view-layouts-list.component.css']
})
export class ViewLayoutsListComponent extends BaseListComponent<SampleViewModel> implements OnInit {
  newItemLink: string | null = null;

  loadItems(): Observable<IResultSet<SampleViewModel> | null | undefined> {
    return of({count: ViewLayoutsListSamples.length, items: ViewLayoutsListSamples }).pipe(delay(2000));
  }

  constructor(private route: ActivatedRoute, private router: Router) {
    super(route, router);
    this.view = ListViewType.Tiles;
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
