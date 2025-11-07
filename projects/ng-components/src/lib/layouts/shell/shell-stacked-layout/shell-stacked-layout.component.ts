import { Component, Input, OnInit } from '@angular/core';

import { IShellConfig } from '../../../types';

@Component({
    selector: 'lib-shell-stacked-layout',
    templateUrl: './shell-stacked-layout.component.html',
    standalone: false
})
export class ShellStackedLayoutComponent implements OnInit {
  constructor() { }

  @Input() config: IShellConfig | undefined;
  @Input() busy: boolean = false;

  public ngOnInit(): void { }
}
