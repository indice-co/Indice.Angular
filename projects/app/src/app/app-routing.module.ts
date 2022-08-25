import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '@indice/ng-auth';
import { AuthCallbackComponent, AuthRenewComponent, ErrorComponent, LoggedOutComponent, PageNotFoundComponent, UnauthorizedComponent } from '@indice/ng-components';
import { AdvancedSearchPlaygroundComponent } from './features/advanced-search-playground/advanced-search-playground.component';
import { ControlsSamplesListComponent } from './features/controls/controls-samples-list/controls-samples-list.component';
import { CustomHeaderSampleComponent } from './features/shell/custom-header-sample/custom-header-sample.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DepthComponent } from './components/depth/depth.component';
import { DepthDetailsComponent } from './components/depth/depth-details/depth-details.component';
import { FluidShellSampleComponent } from './features/shell/fluid-shell-sample/fluid-shell-sample.component';
import { HeaderComponent } from './layout/header/header.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { InboxItemComponent } from './components/inbox-item/inbox-item.component';
import { IShellConfig } from './../../../ng-components/src/lib/types';
import { ModalPlayGroundComponent } from './features/modal-play-ground/modal-playground.componet';
import { MoreDetailsComponent } from './components/depth/more-details/more-details.component';
import { MoreDetailsSubComponent } from './components/depth/more-details/sub/more-details-sub.component';
import { SampleComboboxComponent } from './components/combobox/sample-combobox.component';
import { SampleInfoComponent } from './components/sample-info/sample-info.component';
import { SampleStepperComponent } from './components/stepper/stepper-sample.component';
import { SampleTabsComponent } from './components/tabs/sample-tabs.component';
import { ShellSamplesListComponent } from './features/shell/shell-samples-list/shell-samples-list.component';
import { ToasterSampleComponent } from './features/controls/toaster-sample/toaster-sample.component';
import { ViewLayoutsListComponent } from './features/view-layouts/view-layouts-list/view-layouts-list.component';
import { ModelViewLayoutSampleComponent } from './features/view-layouts/model-view-layout-sample/model-view-layout-sample.component';
import { DemoViewContentsComponent } from './components/demo-view-contents/demo-view-contents.component';
import { DemoViewFormComponent } from './components/demo-view-form/demo-view-form.component';

const customHeaderShellConfig: IShellConfig = {
  appLogo: '',
  appLogoAlt: '',
  breadcrumb: true,
  customHeaderComponent: HeaderComponent,
  fluid: false,
  showFooter: false,
  showHeader: true,
};

const fluidShellConfig: IShellConfig = {
  appLogo: '',
  appLogoAlt: '',
  breadcrumb: true,
  fluid: true,
  showFooter: false,
  showHeader: false
};

const routes: Routes = [
  { path: 'auth-callback', component: AuthCallbackComponent, data: { shell: fluidShellConfig } },
  { path: 'auth-renew', component: AuthRenewComponent, data: { shell: fluidShellConfig } },
  { path: 'logged-out', component: LoggedOutComponent, data: { shell: fluidShellConfig } },
  { path: 'error', component: ErrorComponent, data: { shell: fluidShellConfig } },
  { path: 'unauthorized', component: UnauthorizedComponent, data: { shell: fluidShellConfig } },
  { path: 'forbidden', component: UnauthorizedComponent, data: { shell: fluidShellConfig } },

  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', pathMatch: 'full', component: DashboardComponent, data: { breadcrumb: { title: 'The Dashboard', isHome: true } } },
  { path: 'samples/shell-layout', pathMatch: 'full', component: ShellSamplesListComponent, canActivate: [AuthGuardService], data: { /*register: true*/ } },
  { path: 'samples/inbox', component: InboxComponent, data: { breadcrumb: { title: 'Inbox' } } },
  { path: 'samples/inbox/:id', component: InboxItemComponent, data: { breadcrumb: { title: 'Inbox Details' } } },
  { path: 'samples/shell-layout/info', pathMatch: 'full', component: SampleInfoComponent, outlet: 'rightpane' },
  { path: 'samples/shell-layout/custom-header', pathMatch: 'full', component: CustomHeaderSampleComponent, data: { shell: customHeaderShellConfig } },
  { path: 'samples/shell-layout/fluid', pathMatch: 'full', component: FluidShellSampleComponent, data: { shell: fluidShellConfig } },
  { path: 'samples/controls', pathMatch: 'full', component: ControlsSamplesListComponent },
  { path: 'samples/controls/toaster', pathMatch: 'full', component: ToasterSampleComponent },
  
  { path: 'samples/view-layouts', pathMatch: 'full', component: ViewLayoutsListComponent, data: { breadcrumb: { title: 'View layouts' } }  },
  { path: 'samples/view-layouts/model-view', component: ModelViewLayoutSampleComponent, data: { breadcrumb: { title: 'Model View Layout sample' } },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'tab1' },
      { path: 'tab1', component: DemoViewContentsComponent, data: { breadcrumb: { title: 'Model View Layout sample' } }},
      { path: 'tab2', component: DemoViewFormComponent, data: { breadcrumb: { title: 'Model View Layout sample' } } },
      { path: 'aux-tab1', component: DemoViewContentsComponent, data: { breadcrumb: { title: 'Model View Layout sample' } }},

    ]
  },

  { path: 'samples/modal-playground', pathMatch: 'full', component: ModalPlayGroundComponent },
  { path: 'samples/tab-group', pathMatch: 'full', component: SampleTabsComponent },
  { path: 'samples/combobox', pathMatch: 'full', component: SampleComboboxComponent },
  { path: 'samples/stepper', pathMatch: 'full', component: SampleStepperComponent },
  { path: 'samples/advanced-search-playground', pathMatch: 'full', component: AdvancedSearchPlaygroundComponent },
  {
    path: 'samples/depth/:id', component: DepthComponent, children: [
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: 'details', component: DepthDetailsComponent },
      {
        path: 'more-details', component: MoreDetailsComponent, children: [
          { path: 'sub', component: MoreDetailsSubComponent }
        ]
      },
    ]
  }/*,
  { path: '**', component: PageNotFoundComponent, data: { shell: fluidShellConfig } }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 25]
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
