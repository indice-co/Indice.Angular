import { SHELL_CONFIG } from './../../../tokens';
import { IShellConfig, DefaultShellConfig } from './../../../types';
import { AfterViewInit, Component, OnInit, OnDestroy, Inject, ViewChildren, ViewContainerRef, QueryList } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { ActivationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ComponentLoaderService } from '../../../services/component-loader.service';
import { DynamicComponentHostDirective } from '../../../directives/dynamic-component-host.directive';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'lib-shell-layout',
  templateUrl: './shell-layout.component.html'
})
export class ShellLayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren(DynamicComponentHostDirective)
  dynamicComponentHosts: QueryList<DynamicComponentHostDirective> | null = null;
  public showRightPaneSM = false;
  private routerSub$: Subscription | null = null;
  public activeConfig: IShellConfig = new DefaultShellConfig();
  public activeSidePane = false;
  constructor(@Inject(DOCUMENT) private document: any,
              private router: Router, private location: Location,
              @Inject(SHELL_CONFIG) private config: IShellConfig | null,
              private componentLoaderService: ComponentLoaderService) {
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
          this.activeSidePane = (e as ActivationStart)?.snapshot.outlet !== null;
          console.log('side pane activation detected: ', this.activeSidePane);
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

  ngAfterViewInit(): void {
    if(this.dynamicComponentHosts && this.dynamicComponentHosts.length > 0){
      this.loadCustomComponent(this.dynamicComponentHosts.find(_ => _.hostName === 'Header'));
      this.loadCustomComponent(this.dynamicComponentHosts.find(_ => _.hostName === 'Footer'));
    }
  }

  ngOnDestroy(): void {
    if (this.routerSub$) {
      this.routerSub$.unsubscribe();
    }
  }

  public onSidePaneActivated($event: any): void {
    console.log('ShellLayoutComponent: onSidePaneActivated', $event);
    this.activeSidePane = true;
    this.showRightPaneSM = true;
  }

  public onSidePaneDeactivated($event: any): void {
    console.log('ShellLayoutComponent: onSidePaneActivated', $event);
    this.activeSidePane = false;
    this.showRightPaneSM = false;
  }

  public closeSidePane(): void {
    this.location.back();
  }

  private loadCustomComponent(host: DynamicComponentHostDirective | undefined): void{
    if (host){
      const viewContainerRef = host.viewContainerRef;
      if (viewContainerRef) {
        this.componentLoaderService.loadComponent(viewContainerRef, this.activeConfig.customHeaderComponent);
      }
    }
  }
}
