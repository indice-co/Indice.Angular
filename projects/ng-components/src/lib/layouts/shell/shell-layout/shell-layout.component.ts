import { SHELL_CONFIG } from './../../../tokens';
import { IShellConfig, DefaultShellConfig } from './../../../types';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { ActivationStart, NavigationStart, Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'lib-shell-layout',
  templateUrl: './shell-layout.component.html'
})
export class ShellLayoutComponent implements OnInit, OnDestroy {
  public showRightPaneSM = false;
  private routerSub$: Subscription | null = null;
  public activeConfig: IShellConfig = new DefaultShellConfig();
  constructor(private router: Router, private location: Location, @Inject(SHELL_CONFIG) private config: IShellConfig | null) {
    if (!config) {
      config = new DefaultShellConfig();
    }
    this.activeConfig = config;
  }

  ngOnInit(): void {
    this.routerSub$ = this.router.events
    .pipe(filter(event => event instanceof ActivationStart))
    .subscribe((e) => {
      console.log('ShellLayoutComponent ActivationStart', e);
      if ((e as ActivationStart)?.snapshot) {
        console.log('ShellLayoutComponent ActivationStart snapshot', (e as ActivationStart)?.snapshot);
        if ((e as ActivationStart)?.snapshot?.data) {
          console.log('ShellLayoutComponent ActivationStart snapshot data', (e as ActivationStart)?.snapshot.data);
          if ((e as ActivationStart)?.snapshot?.data.shell) {
            console.log('ShellLayoutComponent ActivationStart snapshot data shell params', (e as ActivationStart)?.snapshot.data.shell);
            this.activeConfig = (e as ActivationStart)?.snapshot.data.shell as IShellConfig;
            console.log('ShellLayoutComponent activeConfig from route: ', this.activeConfig);
          } else {
            this.activeConfig = this.config ? this.config : new DefaultShellConfig();
            console.log('ShellLayoutComponent default activeConfig: ', this.activeConfig);
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSub$) {
      this.routerSub$.unsubscribe();
    }
  }

  public onSidePaneActivated($event: any): void  {
    console.log('onSidePaneActivated', $event);
    this.showRightPaneSM = true;
  }

  public onSidePaneDeactivated($event: any): void  {
    console.log('onSidePaneActivated', $event);
    this.showRightPaneSM = false;
  }

  public closeSidePane(): void {
    this.location.back();
  }

}
