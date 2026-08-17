import { Component, OnInit, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'lib-skeleton-loader',
    templateUrl: './skeleton-loader.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonLoaderComponent implements OnInit {
  readonly count = input(7);
  readonly type = input('tiles'); // 'large-tile', 'table'
  readonly deckClass = input('cards-deck-4', { alias: "deck-class" }); // 'large-tile', 'table'
  constructor() { }

  ngOnInit(): void {
  }

  public counter(i: number): number[] {
    return new Array(i);
  }

}
