
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from './../environments/environment';

import { AuthGuardService, AuthHttpInterceptor, AuthService, AUTH_SETTINGS, IndiceAuthModule } from '@indice/ng-auth';
import { APP_LINKS, IndiceComponentsModule, SHELL_CONFIG, IShellConfig } from '@indice/ng-components';
import { AppLinks } from './app.links';

import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ShellSamplesListComponent } from './features/shell/shell-samples-list/shell-samples-list.component';
import { ViewLayoutsListComponent } from './features/view-layouts/view-layouts-list/view-layouts-list.component';
import { CustomHeaderSampleComponent } from './features/shell/custom-header-sample/custom-header-sample.component';

class ShellConfig implements IShellConfig {
  fluid = false;
  showFooter = true;
  showHeader = true;
}
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ShellSamplesListComponent,
    ViewLayoutsListComponent,
    CustomHeaderSampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IndiceAuthModule.forRoot(),
    IndiceComponentsModule,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    { provide: AUTH_SETTINGS, useFactory: () => environment.auth_settings },
    { provide: SHELL_CONFIG, useFactory: () => new ShellConfig() },
    { provide: APP_LINKS, useFactory: () => new AppLinks() },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
