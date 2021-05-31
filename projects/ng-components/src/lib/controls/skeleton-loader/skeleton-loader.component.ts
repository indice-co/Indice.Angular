import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'lib-skeleton-loader',
  templateUrl: './skeleton-loader.component.html'
})
export class SkeletonLoaderComponent implements OnInit {
  @Input() count = 5;
  @Input() type = 'tiles'; // 'large-tile', 'table'
  constructor() { }

  ngOnInit(): void {
  }

  public counter(i: number): number[] {
    return new Array(i);
  }

}
