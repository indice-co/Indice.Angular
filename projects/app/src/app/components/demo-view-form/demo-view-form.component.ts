import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-demo-view-form',
    templateUrl: './demo-view-form.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DemoViewFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
