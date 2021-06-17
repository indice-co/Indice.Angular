import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '@indice/ng-auth';
import {
  AuthCallbackComponent, AuthRenewComponent, ErrorComponent, LoggedOutComponent,
  PageNotFoundComponent, UnauthorizedComponent
} from '@indice/ng-components';

import { DashboardComponent } from './features/dashboard/dashboard.component';

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
  { path: 'dashboard', pathMatch: 'prefix', component: DashboardComponent, canActivate: [AuthGuardService] },

  // not found
  { path: '**', component: PageNotFoundComponent, data: { shell: { fluid: true, showHeader: false, showFooter: false } } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
