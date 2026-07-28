import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'lib-error',
    templateUrl: './error.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ErrorComponent implements OnInit {
  public error = 'Error!';

  ngOnInit(): void {
  }

}
