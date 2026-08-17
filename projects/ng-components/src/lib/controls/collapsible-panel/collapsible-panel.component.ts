import { Component, OnInit, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
    selector: 'lib-collapsible-panel',
    templateUrl: './collapsible-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollapsiblePanelComponent implements OnInit {
  readonly title = input<string | null>(null);
  public visible = false;

  constructor() { }

  ngOnInit(): void {
  }

}
