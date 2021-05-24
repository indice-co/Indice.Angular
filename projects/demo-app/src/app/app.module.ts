import { HomeComponent } from './features/home/home.component';
import { IndiceComponentsModule } from './../../../ng-components/src/lib/ng-components.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService, AuthHttpInterceptor, AuthService, IndiceAuthModule } from '@indice/ng-auth';
import { APP_LINKS } from '@indice/ng-components';
import { AppLinks } from './app.links';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IndiceAuthModule.forRoot(),
    IndiceComponentsModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    { provide: APP_LINKS, useFactory: () => new AppLinks() },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
