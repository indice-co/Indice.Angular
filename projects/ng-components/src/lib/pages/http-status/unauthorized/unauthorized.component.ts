import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'lib-unauthorized',
    templateUrl: './unauthorized.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class UnauthorizedComponent implements OnInit {
  constructor() { }

  public ngOnInit(): void { }
}
