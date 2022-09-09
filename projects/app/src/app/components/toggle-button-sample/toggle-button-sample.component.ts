import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toggle-button-sample',
  templateUrl: './toggle-button-sample.component.html',
  styleUrls: ['./toggle-button-sample.component.scss']
})
export class ToggleButtonSampleComponent implements OnInit {

  public toggleValue: boolean = false;
  public toggleDisabled: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
