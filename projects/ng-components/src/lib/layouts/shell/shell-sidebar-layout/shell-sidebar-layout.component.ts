import { Component, Inject, Input, OnInit, Optional, TemplateRef, ChangeDetectionStrategy, input } from '@angular/core';

import { IShellConfig } from '../../../types';
import { UserSettingsService } from '../../../services/user-settings.service';
import { ShellSidebarComponent } from '../shell-sidebar/shell-sidebar.component';
import { NgTemplateOutlet } from '@angular/common';
import { ShellSidebarHeaderComponent } from '../shell-sidebar-header/shell-sidebar-header.component';
import { BreadcrumbComponent } from '../../../controls/breadcrumb/breadcrumb.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'lib-shell-sidebar-layout',
    templateUrl: './shell-sidebar-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ShellSidebarComponent, NgTemplateOutlet, ShellSidebarHeaderComponent, BreadcrumbComponent, RouterOutlet]
})
export class ShellSidebarLayoutComponent implements OnInit {
  @Input() config: IShellConfig | undefined;
  @Input() public sidebarFooterTemplate?: TemplateRef<any>;
  readonly busy = input<boolean>(false);
  
  constructor(private _userSettings: UserSettingsService) {
    this.showMobileSidebar = this._userSettings.get('MobileSideBar');
  }

  public showMobileSidebar: boolean;

  public ngOnInit(): void { }

  public toggleMobileSidebar(): void {
    this.showMobileSidebar = !this.showMobileSidebar;
    this._userSettings.set('MobileSideBar', this.showMobileSidebar);
  }
}
