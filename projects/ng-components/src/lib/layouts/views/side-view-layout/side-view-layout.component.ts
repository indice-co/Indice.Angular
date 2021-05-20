import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'lib-side-view-layout',
  templateUrl: './side-view-layout.component.html'
})
export class SideViewLayoutComponent implements OnInit {
  @Input() title: string | null = 'Πληροφορίες';
  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  public closeSidePane(): void {
    this.location.back();
  }

}
