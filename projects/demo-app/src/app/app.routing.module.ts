import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCallbackComponent, AuthRenewComponent, ErrorComponent, LoggedOutComponent, PageNotFoundComponent, UnauthorizedComponent } from '@indice/ng-components';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
   // common
   { path: 'auth-callback', component: AuthCallbackComponent },
   { path: 'auth-renew', component: AuthRenewComponent },
   { path: 'logged-out', component: LoggedOutComponent },
   { path: 'error', component: ErrorComponent },
   { path: 'unauthorized', component: UnauthorizedComponent },
   { path: 'forbidden', component: UnauthorizedComponent },
   // not found
   { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
