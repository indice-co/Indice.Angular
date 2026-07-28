import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'lib-collapsible-panel',
    templateUrl: './collapsible-panel.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CollapsiblePanelComponent implements OnInit {
  @Input() title: string | null = null;
  public visible = false;

  constructor() { }

  ngOnInit(): void {
  }

}
