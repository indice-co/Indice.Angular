import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ViewLayoutComponent } from '../../../layouts/views/view-layout/view-layout.component';

@Component({
    selector: 'lib-error',
    templateUrl: './error.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ViewLayoutComponent]
})
export class ErrorComponent implements OnInit {
  public error = 'Error!';

  ngOnInit(): void {
  }

}
