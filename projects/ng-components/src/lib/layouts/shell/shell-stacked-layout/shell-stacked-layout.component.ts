import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { IShellConfig } from '../../../types';
import { DynamicComponentHostDirective } from '../../../directives/dynamic-component-host.directive';
import { ShellHeaderComponent } from '../shell-header/shell-header.component';
import { RouterOutlet } from '@angular/router';
import { ShellFooterComponent } from '../shell-footer/shell-footer.component';

@Component({
    selector: 'lib-shell-stacked-layout',
    templateUrl: './shell-stacked-layout.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [DynamicComponentHostDirective, ShellHeaderComponent, RouterOutlet, ShellFooterComponent]
})
export class ShellStackedLayoutComponent implements OnInit {
  constructor() { }

  @Input() config: IShellConfig | undefined;
  @Input() busy: boolean = false;

  public ngOnInit(): void { }
}
