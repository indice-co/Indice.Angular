import { EnvironmentProviders, ModuleWithProviders, NgModule, makeEnvironmentProviders } from '@angular/core';

import { AuthGuardService } from './auth-guard.service';
import { AuthHttpInterceptor } from './auth-http-interceptor';
import { AuthService } from './auth.service';
import { TenantHeaderInterceptor } from './tenant/tenant-header.interceptor';
import { TenantService } from './tenant/tenant-service';
import { ImgUserPictureDirective } from './directives/user-picture.directive';

/**
 * The Indice auth services, shared by {@link provideIndiceAuth} and {@link IndiceAuthModule.forRoot}.
 */
const AUTH_PROVIDERS = [
  AuthGuardService,
  AuthHttpInterceptor,
  AuthService,
  TenantHeaderInterceptor,
  TenantService
];

/**
 * Registers the Indice auth services for a standalone application.
 *
 * @remarks
 * Prefer this in a standalone bootstrap (`ApplicationConfig.providers`) and import the standalone
 * {@link ImgUserPictureDirective} where needed. This is the standalone-native replacement for
 * {@link IndiceAuthModule.forRoot}.
 */
export function provideIndiceAuth(): EnvironmentProviders {
  return makeEnvironmentProviders([...AUTH_PROVIDERS]);
}

/**
 * @deprecated Compatibility shim for NgModule-based consumers. Prefer importing the standalone
 * {@link ImgUserPictureDirective} directly and calling {@link provideIndiceAuth}. This module will
 * be removed in a future major.
 */
@NgModule({
  imports: [ImgUserPictureDirective],
  exports: [ImgUserPictureDirective]
})
export class IndiceAuthModule {
  static forRoot(): ModuleWithProviders<IndiceAuthModule> {
    return {
      ngModule: IndiceAuthModule,
      providers: [...AUTH_PROVIDERS]
    };
  }
}
