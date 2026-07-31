import { AfterViewInit, Component, OnInit, OnDestroy, Inject, ViewChildren, QueryList, AfterViewChecked, TemplateRef, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SHELL_CONFIG } from './../../../tokens';
import { IShellConfig, DefaultShellConfig } from './../../../types';
import { DynamicComponentHostDirective } from '../../../directives/dynamic-component-host.directive';
import { ComponentLoaderFactory } from '../../../services/component-loader/component-loader.factory';
import { SidePaneComponent } from '../../../../public-api';
import { ShellStackedLayoutComponent } from '../shell-stacked-layout/shell-stacked-layout.component';
import { ShellSidebarLayoutComponent } from '../shell-sidebar-layout/shell-sidebar-layout.component';
import { SidePaneComponent as SidePaneComponent_1 } from '../../../controls/side-pane/side-pane.component';
import { ToasterContainerComponent } from '../../../controls/toaster/toaster-container.component';

@Component({
    selector: 'lib-shell-layout', templateUrl: './shell-layout.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ShellStackedLayoutComponent, ShellSidebarLayoutComponent, SidePaneComponent_1, RouterOutlet, ToasterContainerComponent]
})
export class ShellLayoutComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
  @ViewChildren(DynamicComponentHostDirective) private _dynamicComponentHosts: QueryList<DynamicComponentHostDirective> | null = null;
  @ViewChild('rightPane') rightPane: SidePaneComponent | undefined;
  @Input() busy: boolean = false;
  @Input() public sidebarFooterTemplate?: TemplateRef<any>;
  private _routerSub$: Subscription | null = null;
  public showRightPaneSM = false;
  public activeConfig: IShellConfig = new DefaultShellConfig();
  public loaded = false;
  public hideSidebar = false;

  constructor(private _router: Router, private _componentLoaderFactory: ComponentLoaderFactory, @Inject(SHELL_CONFIG) private _config: IShellConfig | undefined) {
    if (!_config) {
      _config = new DefaultShellConfig();
    }
    this.activeConfig = _config;
  }

  public ngAfterViewChecked(): void {
    setTimeout(() => { this.loaded = true; }, 200);
  }

  public ngOnInit(): void {
    this._routerSub$ = this._router.events.pipe(filter((event) => event instanceof ActivationStart))
    .subscribe((event) => {
      if ((event as ActivationStart)?.snapshot) {
        if ((event as ActivationStart)?.snapshot?.data) {
          if ((event as ActivationStart)?.snapshot?.data.shell) {
            this.activeConfig = (event as ActivationStart)?.snapshot.data.shell as IShellConfig;
            if (this.activeConfig.customHeaderComponent) {
              this.initCustomComponents();
            }
          } else {
            this.activeConfig = this._config ? this._config : new DefaultShellConfig();
          }
        }
      }
    });
  }

  public ngAfterViewInit(): void {
    this.initCustomComponents();
  }

  private initCustomComponents(): void {
    if (this._dynamicComponentHosts && this._dynamicComponentHosts.length > 0) {
      this.loadCustomComponent(this._dynamicComponentHosts.find((_) => _.hostName === 'Header'));
    }
  }

  public ngOnDestroy(): void {
    if (this._routerSub$) {
      this._routerSub$.unsubscribe();
    }
  }

  private loadCustomComponent(host: DynamicComponentHostDirective | undefined): void {
    if (host) {
      const viewContainerRef = host.viewContainerRef;
      if (viewContainerRef && this.activeConfig.customHeaderComponent) {
        const clf = this._componentLoaderFactory.createLoader(viewContainerRef);
        clf.attach(this.activeConfig.customHeaderComponent).to(viewContainerRef.element).show();
      }
    }
  }

  onSidePaneActivated($event: any): void {
    this.rightPane?.onSidePaneActivated($event);
  }

  onSidePaneDeactivated($event: any): void {
    this.rightPane?.onSidePaneDeactivated($event);
  }
}
