import { Component, Input, OnInit } from '@angular/core';
import { IShellConfig } from '../../../types';

@Component({
  selector: 'lib-shell-sidebar-layout',
  templateUrl: './shell-sidebar-layout.component.html'
})
export class ShellSidebarLayoutComponent implements OnInit {
  
  @Input() config: IShellConfig | undefined;
  public showMobileSidebar = false;
  constructor() { }

  ngOnInit(): void {
  }

  public toggleMobileSidebar(): void {
    this.showMobileSidebar = !this.showMobileSidebar;
  }

}
