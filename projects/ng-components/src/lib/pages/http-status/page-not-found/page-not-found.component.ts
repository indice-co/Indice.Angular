import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ViewLayoutComponent } from '../../../layouts/views/view-layout/view-layout.component';

@Component({
    selector: 'lib-page-not-found',
    templateUrl: './page-not-found.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ViewLayoutComponent]
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
