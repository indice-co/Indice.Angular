import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-toggle-button-sample',
    templateUrl: './toggle-button-sample.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ToggleButtonSampleComponent implements OnInit {

  public toggleValue: boolean = false;
  public toggleDisabled: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
