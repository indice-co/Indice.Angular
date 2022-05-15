import { SampleInfoComponent } from './components/sample-info/sample-info.component';
import { IShellConfig } from './../../../ng-components/src/lib/types';
import { CustomHeaderSampleComponent } from './features/shell/custom-header-sample/custom-header-sample.component';
import { ViewLayoutsListComponent } from './features/view-layouts/view-layouts-list/view-layouts-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '@indice/ng-auth';
import {
  AuthCallbackComponent,
  AuthRenewComponent,
  ErrorComponent,
  LoggedOutComponent,
  PageNotFoundComponent,
  UnauthorizedComponent,
} from '@indice/ng-components';

import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ShellSamplesListComponent } from './features/shell/shell-samples-list/shell-samples-list.component';
import { HeaderComponent } from './layout/header/header.component';
import { FluidShellSampleComponent } from './features/shell/fluid-shell-sample/fluid-shell-sample.component';
import { ControlsSamplesListComponent } from './features/controls/controls-samples-list/controls-samples-list.component';
import { ToasterSampleComponent } from './features/controls/toaster-sample/toaster-sample.component';
import { ModalPlayGroundComponent } from './features/modal-play-ground/modal-playground.componet';
import { InboxComponent } from './components/inbox/inbox.component';

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
  showFooter: true,
  showHeader: true,
  appLogo: '',
  appLogoAlt: ''
};

const defaultShellConfig: IShellConfig = {
  fluid: false,
  showFooter: true,
  showHeader: true,
  appLogo: '',
  appLogoAlt: '',
  langs : ['EL', 'EN'],
  showAlertsOnHeader : true,
  showUserNameOnHeader : false
};

const routes: Routes = [
  // auth
  { path: 'auth-callback', component: AuthCallbackComponent },
  { path: 'auth-renew', component: AuthRenewComponent },
  { path: 'logged-out', component: LoggedOutComponent },
  // http-status
  { path: 'error', component: ErrorComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'forbidden', component: UnauthorizedComponent },

  // features
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', pathMatch: 'full', component: DashboardComponent, data: { shell: defaultShellConfig } },
  // SHELL LAYOUTS SAMPLES !!!
  {
    path: 'samples/shell-layout',
    pathMatch: 'full',
    component: ShellSamplesListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'samples/inbox',
    pathMatch: 'full',
    component: InboxComponent,
    outlet: 'rightpane',
  },
  {
    path: 'samples/shell-layout/info',
    pathMatch: 'full',
    component: SampleInfoComponent,
    outlet: 'rightpane',
  },
  {
    path: 'samples/shell-layout/custom-header',
    pathMatch: 'full',
    component: CustomHeaderSampleComponent,
    data: { shell: customHeaderShellConfig },
  },
  {
    path: 'samples/shell-layout/fluid',
    pathMatch: 'full',
    component: FluidShellSampleComponent,
    data: { shell: fluidShellConfig },
  },
  // CONTROLS !!!
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

  // not found
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { shell: { fluid: true, showHeader: false, showFooter: false } },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
