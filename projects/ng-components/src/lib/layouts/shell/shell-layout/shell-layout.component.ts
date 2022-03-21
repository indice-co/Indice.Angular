import { SHELL_CONFIG } from './../../../tokens';
import { IShellConfig, DefaultShellConfig } from './../../../types';
import { AfterViewInit, Component, OnInit, OnDestroy, Inject, ViewChildren, QueryList, AfterViewChecked } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { ActivationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription, timer } from 'rxjs';
import { DynamicComponentHostDirective } from '../../../directives/dynamic-component-host.directive';
import { ComponentLoaderFactory } from '../../../services/component-loader/component-loader.factory';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'lib-shell-layout',
  templateUrl: './shell-layout.component.html',
})
export class ShellLayoutComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
  @ViewChildren(DynamicComponentHostDirective)
  dynamicComponentHosts: QueryList<DynamicComponentHostDirective> | null = null;
  public showRightPaneSM = false;
  private routerSub$: Subscription | null = null;
  public activeConfig: IShellConfig = new DefaultShellConfig();
  public loaded = false;
  constructor(
    @Inject(DOCUMENT) private document: any,
    private router: Router,
    private location: Location,
    @Inject(SHELL_CONFIG) private config: IShellConfig | null,
    private componentLoaderFactory: ComponentLoaderFactory
  ) {
    if (!config) {
      config = new DefaultShellConfig();
    }
    this.activeConfig = config;
  }

  ngAfterViewChecked(): void {
    setTimeout(() => { this.loaded = true; }, 200);
  }

  ngOnInit(): void {
    this.routerSub$ = this.router.events.pipe(filter((event) => event instanceof ActivationStart)).subscribe((e) => {
      // console.log('ShellLayoutComponent ActivationStart', e);
      if ((e as ActivationStart)?.snapshot) {
        // console.log('ShellLayoutComponent ActivationStart snapshot', (e as ActivationStart)?.snapshot);
        if ((e as ActivationStart)?.snapshot?.data) {
          // console.log('ShellLayoutComponent ActivationStart snapshot data', (e as ActivationStart)?.snapshot.data);
          if ((e as ActivationStart)?.snapshot?.data.shell) {
            // console.log('ShellLayoutComponent ActivationStart snapshot data shell params',
            // (e as ActivationStart)?.snapshot.data.shell);
            this.activeConfig = (e as ActivationStart)?.snapshot.data.shell as IShellConfig;
            // console.log('ShellLayoutComponent activeConfig from route: ', this.activeConfig);
            if (this.activeConfig.customHeaderComponent) {
              this.initCustomComponents();
            }
          } else {
            this.activeConfig = this.config ? this.config : new DefaultShellConfig();
            // console.log('ShellLayoutComponent default activeConfig: ', this.activeConfig);
          }
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.initCustomComponents();
  }

  private initCustomComponents(): void {
    if (this.dynamicComponentHosts && this.dynamicComponentHosts.length > 0) {
      this.loadCustomComponent(this.dynamicComponentHosts.find((_) => _.hostName === 'Header'));
      // since you're not using it...
      // this.loadCustomComponent(this.dynamicComponentHosts.find(_ => _.hostName === 'Footer'));
    }
  }

  ngOnDestroy(): void {
    if (this.routerSub$) {
      this.routerSub$.unsubscribe();
    }
  }

  private loadCustomComponent(host: DynamicComponentHostDirective | undefined): void {
    if (host) {
      const viewContainerRef = host.viewContainerRef;
      if (viewContainerRef && this.activeConfig.customHeaderComponent) {
        const clf = this.componentLoaderFactory.createLoader(viewContainerRef);
        const headerCompRef = clf.attach(this.activeConfig.customHeaderComponent).to(viewContainerRef.element).show();
      }
    }
  }
}
