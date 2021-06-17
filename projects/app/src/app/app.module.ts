import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from './../environments/environment';

import { AuthGuardService, AuthHttpInterceptor, AuthService, AUTH_SETTINGS, IndiceAuthModule } from '@indice/ng-auth';
import { APP_LINKS, IndiceComponentsModule, SHELL_CONFIG, IShellConfig } from '@indice/ng-components';

import { DashboardComponent } from './features/dashboard/dashboard.component';

import { AppLinks } from './app.links';

class ShellConfig implements IShellConfig {
  fluid = false;
  showFooter = true;
  showHeader = true;
}
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
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
    { provide: SHELL_CONFIG, useFactory: () => new ShellConfig },
    { provide: APP_LINKS, useFactory: () => new AppLinks() },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
