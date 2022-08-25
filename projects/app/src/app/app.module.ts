import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { APP_LANGUAGES, APP_LINKS, APP_NOTIFICATIONS, IndiceComponentsModule, ModalService, SHELL_CONFIG, ToasterService } from '@indice/ng-components';
import { AdvancedSearchPlaygroundComponent } from './features/advanced-search-playground/advanced-search-playground.component';
import { AppComponent } from './app.component';
import { AppLanguagesService } from './services/app-languages.service';
import { AppLinks } from './app.links';
import { AppNotificationsService } from './services/app-notifications.service';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService, AuthHttpInterceptor, AuthService, AUTH_SETTINGS, IndiceAuthModule } from '@indice/ng-auth';
import { ControlsSamplesListComponent } from './features/controls/controls-samples-list/controls-samples-list.component';
import { CustomHeaderSampleComponent } from './features/shell/custom-header-sample/custom-header-sample.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DepthComponent } from './components/depth/depth.component';
import { DepthDetailsComponent } from './components/depth/depth-details/depth-details.component';
import { environment } from './../environments/environment';
import { FluidShellSampleComponent } from './features/shell/fluid-shell-sample/fluid-shell-sample.component';
import { HeaderComponent } from './layout/header/header.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { InboxItemComponent } from './components/inbox-item/inbox-item.component';
import { ModalPlayGroundComponent } from './features/modal-play-ground/modal-playground.componet';
import { MoreDetailsComponent } from './components/depth/more-details/more-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SampleAppShellConfig } from './app-shell-config';
import { SampleComboboxComponent } from './components/combobox/sample-combobox.component';
import { SampleInfoComponent } from './components/sample-info/sample-info.component';
import { SampleModalComponent } from './components/sample-modals/sample-modal.component';
import { SampleStepperComponent } from './components/stepper/stepper-sample.component';
import { SampleTabsComponent } from './components/tabs/sample-tabs.component';
import { ShellSamplesListComponent } from './features/shell/shell-samples-list/shell-samples-list.component';
import { ToasterSampleComponent } from './features/controls/toaster-sample/toaster-sample.component';
import { ViewLayoutsListComponent } from './features/view-layouts/view-layouts-list/view-layouts-list.component';
import { MoreDetailsSubComponent } from './components/depth/more-details/sub/more-details-sub.component';
import { ModelViewLayoutSampleComponent } from './features/view-layouts/model-view-layout-sample/model-view-layout-sample.component';
import { DemoViewContentsComponent } from './components/demo-view-contents/demo-view-contents.component';
import { DemoViewFormComponent } from './components/demo-view-form/demo-view-form.component';

@NgModule({
  declarations: [
    AdvancedSearchPlaygroundComponent,
    AppComponent,
    ControlsSamplesListComponent,
    CustomHeaderSampleComponent,
    DashboardComponent,
    DepthComponent,
    DepthDetailsComponent,
    FluidShellSampleComponent,
    HeaderComponent,
    InboxComponent,
    InboxItemComponent,
    ModalPlayGroundComponent,
    MoreDetailsComponent,
    MoreDetailsSubComponent,
    SampleComboboxComponent,
    SampleInfoComponent,
    SampleModalComponent,
    SampleStepperComponent,
    SampleTabsComponent,
    SampleTabsComponent,
    ShellSamplesListComponent,
    ToasterSampleComponent,
    ViewLayoutsListComponent,
    ModelViewLayoutSampleComponent,
    DemoViewContentsComponent,
    DemoViewFormComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    IndiceAuthModule,
    IndiceComponentsModule.forRoot(),
    ReactiveFormsModule
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
    { provide: APP_LANGUAGES, useClass: AppLanguagesService }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
