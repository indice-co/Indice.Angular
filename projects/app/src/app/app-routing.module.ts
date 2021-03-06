import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '@indice/ng-auth';
import { AuthCallbackComponent, AuthRenewComponent, ErrorComponent, LoggedOutComponent, PageNotFoundComponent, UnauthorizedComponent } from '@indice/ng-components';
import { ControlsSamplesListComponent } from './features/controls/controls-samples-list/controls-samples-list.component';
import { CustomHeaderSampleComponent } from './features/shell/custom-header-sample/custom-header-sample.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { FluidShellSampleComponent } from './features/shell/fluid-shell-sample/fluid-shell-sample.component';
import { HeaderComponent } from './layout/header/header.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { InboxItemComponent } from './components/inbox-item/inbox-item.component';
import { IShellConfig } from './../../../ng-components/src/lib/types';
import { ModalPlayGroundComponent } from './features/modal-play-ground/modal-playground.componet';
import { SampleComboboxComponent } from './components/combobox/sample-combobox.component';
import { SampleInfoComponent } from './components/sample-info/sample-info.component';
import { SampleStepperComponent } from './components/stepper/stepper-sample.component';
import { AdvancedSearchPlaygroundComponent } from './features/advanced-search-playground/advanced-search-playground.component';
import { SampleTabsComponent } from './components/tabs/sample-tabs.component';
import { ShellSamplesListComponent } from './features/shell/shell-samples-list/shell-samples-list.component';
import { ToasterSampleComponent } from './features/controls/toaster-sample/toaster-sample.component';
import { ViewLayoutsListComponent } from './features/view-layouts/view-layouts-list/view-layouts-list.component';


const customHeaderShellConfig: IShellConfig = {
  fluid: false,
  showFooter: false,
  showHeader: true,
  customHeaderComponent: HeaderComponent,
  appLogo: '',
  appLogoAlt: ''
};

const fluidShellConfig: IShellConfig = {
  fluid: true,
  showFooter: false,
  showHeader: false,
  appLogo: '',
  appLogoAlt: ''
};

const routes: Routes = [
  { path: 'auth-callback', component: AuthCallbackComponent, data: { shell: fluidShellConfig } },
  { path: 'auth-renew', component: AuthRenewComponent, data: { shell: fluidShellConfig } },
  { path: 'logged-out', component: LoggedOutComponent, data: { shell: fluidShellConfig } },
  { path: 'error', component: ErrorComponent, data: { shell: fluidShellConfig } },
  { path: 'unauthorized', component: UnauthorizedComponent, data: { shell: fluidShellConfig } },
  { path: 'forbidden', component: UnauthorizedComponent, data: { shell: fluidShellConfig } },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', pathMatch: 'full', component: DashboardComponent },
  { path: 'samples/shell-layout', pathMatch: 'full', component: ShellSamplesListComponent, canActivate: [AuthGuardService], data: { register: true } },
  {
    path: 'samples/shell-layout',
    pathMatch: 'full',
    component: ShellSamplesListComponent,
    canActivate: [AuthGuardService],
    // data: { register: true }
  },
  {
    path: 'samples/inbox',
    pathMatch: 'full',
    component: InboxComponent,
    children: [
      { path: 'view/:id', component: InboxItemComponent, outlet: 'rightpane' }
    ]
  },
  { path: 'samples/inbox/:id', pathMatch: 'full', component: InboxItemComponent, outlet: 'rightpane' },
  { path: 'samples/shell-layout/info', pathMatch: 'full', component: SampleInfoComponent, outlet: 'rightpane' },
  { path: 'samples/shell-layout/custom-header', pathMatch: 'full', component: CustomHeaderSampleComponent, data: { shell: customHeaderShellConfig } },
  { path: 'samples/shell-layout/fluid', pathMatch: 'full', component: FluidShellSampleComponent, data: { shell: fluidShellConfig } },
  {
    path: 'samples/controls',
    pathMatch: 'full',
    component: ControlsSamplesListComponent,
  },
  {
    path: 'samples/controls/toaster',
    pathMatch: 'full',
    component: ToasterSampleComponent,
  },
  // VIEW LAYOUTS!
  {
    path: 'samples/view-layouts',
    pathMatch: 'full',
    component: ViewLayoutsListComponent,
  },
  {
    path: 'samples/modal-playground',
    pathMatch: 'full',
    component: ModalPlayGroundComponent,
  },
  { path: 'samples/tab-group', pathMatch: 'full', component: SampleTabsComponent },
  { path: 'samples/combobox', pathMatch: 'full', component: SampleComboboxComponent },
  { path: 'samples/stepper', pathMatch: 'full', component: SampleStepperComponent },
  // ADVANCED SEARCH!
  {
    path: 'samples/advanced-search-playground',
    pathMatch: 'full',
    component: AdvancedSearchPlaygroundComponent,
  },
  // not found
  {
    path: '**',
    component: PageNotFoundComponent, data: { shell: fluidShellConfig }
  }
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

