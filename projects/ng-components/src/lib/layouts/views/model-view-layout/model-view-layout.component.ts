import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'lib-model-view-layout',
  templateUrl: './model-view-layout.component.html'
})
export class ModelViewLayoutComponent implements OnInit {
  @Input() title = 'no title';
  // tslint:disable-next-line:no-input-rename
  @Input('primary-links') primary: { text: string, link: string }[] | null = null;
  // tslint:disable-next-line:no-input-rename
  @Input('secondary-links') secondary: { text: string, link: string }[] | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
