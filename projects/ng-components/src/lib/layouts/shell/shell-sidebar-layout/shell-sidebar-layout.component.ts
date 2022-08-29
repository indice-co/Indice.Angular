import { Component, Input, OnInit } from '@angular/core';

import { IShellConfig } from '../../../types';
import { UserSettingsService } from '../../../services/user-settings.service';

@Component({
  selector: 'lib-shell-sidebar-layout',
  templateUrl: './shell-sidebar-layout.component.html'
})
export class ShellSidebarLayoutComponent implements OnInit {
  constructor(
    private _userSettings: UserSettingsService
  ) {
    this.showMobileSidebar = this._userSettings.get('MobileSideBar');
  }

  @Input() config: IShellConfig | undefined;
  public showMobileSidebar: boolean;

  public ngOnInit(): void { }

  public toggleMobileSidebar(): void {
    this.showMobileSidebar = !this.showMobileSidebar;
    this._userSettings.set('MobileSideBar', this.showMobileSidebar);
  }
}
