import { Component, Input } from '@angular/core';

@Component({ selector: 'lib-list-tile', template: '<ng-content></ng-content>' })
export class ListTileComponent {
  @Input() model: any | null = null;

  constructor() {
  }
}
