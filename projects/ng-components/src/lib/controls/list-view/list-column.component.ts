import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'lib-list-column',
  template: '<ng-content></ng-content>'
})
export class ListColumnComponent implements OnInit {

  @Input() title: string | null = null;
  @ContentChild(TemplateRef) template: any | null = null;
  constructor() { }

  ngOnInit(): void {
  }

}
