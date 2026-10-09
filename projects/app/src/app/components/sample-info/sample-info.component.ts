import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'lib-sample-info',
    templateUrl: './sample-info.component.html',
    styleUrls: ['./sample-info.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SampleInfoComponent implements OnInit {

  public showActions = true;
  constructor() { }

  ngOnInit(): void {
  }

}
