import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ViewLayoutComponent } from '../../../layouts/views/view-layout/view-layout.component';

@Component({
    selector: 'lib-unauthorized',
    templateUrl: './unauthorized.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ViewLayoutComponent]
})
export class UnauthorizedComponent implements OnInit {
  constructor() { }

  public ngOnInit(): void { }
}
