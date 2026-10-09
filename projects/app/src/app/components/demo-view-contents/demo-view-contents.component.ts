import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-demo-view-contents',
    templateUrl: './demo-view-contents.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DemoViewContentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
