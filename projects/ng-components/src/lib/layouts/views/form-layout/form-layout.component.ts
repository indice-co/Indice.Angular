import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-form-layout',
  templateUrl: './form-layout.component.html'
})
export class FormLayoutComponent implements OnInit {
  @Input() title: string | null = null;
  // tslint:disable-next-line:no-input-rename
  @Input('sub-title') subTitle: string | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}