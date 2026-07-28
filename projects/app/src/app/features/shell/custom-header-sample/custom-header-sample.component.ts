import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'lib-custom-header-sample',
    templateUrl: './custom-header-sample.component.html',
    styleUrls: ['./custom-header-sample.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CustomHeaderSampleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
