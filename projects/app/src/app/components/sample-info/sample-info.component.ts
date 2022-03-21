import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-sample-info',
  templateUrl: './sample-info.component.html',
  styleUrls: ['./sample-info.component.css']
})
export class SampleInfoComponent implements OnInit {

  public showActions = true;
  constructor() { }

  ngOnInit(): void {
  }

}
