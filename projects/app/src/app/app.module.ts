import { APP_LINKS, APP_LANGUAGES, APP_NOTIFICATIONS, IndiceComponentsModule, SHELL_CONFIG, ToasterService, ModalService } from '../../../ng-components/src/public-api';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from './../environments/environment';

import { AuthGuardService, AuthHttpInterceptor, AuthService, AUTH_SETTINGS, IndiceAuthModule } from '@indice/ng-auth';

import { AppLinks } from './app.links';

import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ShellSamplesListComponent } from './features/shell/shell-samples-list/shell-samples-list.component';
import { ViewLayoutsListComponent } from './features/view-layouts/view-layouts-list/view-layouts-list.component';
import { CustomHeaderSampleComponent } from './features/shell/custom-header-sample/custom-header-sample.component';
import { SampleInfoComponent } from './components/sample-info/sample-info.component';
import { FluidShellSampleComponent } from './features/shell/fluid-shell-sample/fluid-shell-sample.component';
import { ControlsSamplesListComponent } from './features/controls/controls-samples-list/controls-samples-list.component';
import { ToasterSampleComponent } from './features/controls/toaster-sample/toaster-sample.component';
import { HeaderComponent } from './layout/header/header.component';
import { SampleModalComponent } from './components/sample-modals/sample-modal.component';
import { ModalPlayGroundComponent } from './features/modal-play-ground/modal-playground.componet';
import { AppNotificationsService } from './services/app-notifications.service';
import { InboxComponent } from './components/inbox/inbox.component';
import { SampleAppShellConfig } from './app-shell-config';
import { AppLanguagesService } from './services/app-languages.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ShellSamplesListComponent,
    ViewLayoutsListComponent,
    CustomHeaderSampleComponent,
    FluidShellSampleComponent,
    SampleInfoComponent,
    ControlsSamplesListComponent,
    ToasterSampleComponent,
    HeaderComponent,
    SampleModalComponent,
    ModalPlayGroundComponent,
    InboxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IndiceAuthModule.forRoot(),
    IndiceComponentsModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ToasterService,
    ModalService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    { provide: AUTH_SETTINGS, useFactory: () => environment.auth_settings },
    { provide: SHELL_CONFIG, useFactory: () => SampleAppShellConfig },
    { provide: APP_LINKS, useFactory: () => new AppLinks() },
    { provide: APP_NOTIFICATIONS, useClass: AppNotificationsService },
    { provide: APP_LANGUAGES, useClass: AppLanguagesService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
