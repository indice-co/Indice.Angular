import { Component, Input, OnInit } from '@angular/core';
import { IShellConfig } from '../../../types';

@Component({
  selector: 'lib-shell-stacked-layout',
  templateUrl: './shell-stacked-layout.component.html'
})
export class ShellStackedLayoutComponent implements OnInit {
  @Input() config: IShellConfig | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
