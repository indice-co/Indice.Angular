import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-collapsible-panel',
  templateUrl: './collapsible-panel.component.html'
})
export class CollapsiblePanelComponent implements OnInit {
  @Input() title: string | null = null;
  public visible = false;

  constructor() { }

  ngOnInit(): void {
  }

}
