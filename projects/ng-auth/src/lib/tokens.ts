import { InjectionToken } from '@angular/core';

import { IAuthSettings, AuthInterceptorConfig } from './types';

export const AUTH_SETTINGS = new InjectionToken<IAuthSettings>('AUTH_SETTINGS');
export const TENANT_PREFIX_URL = new InjectionToken<string>('TENANT_PREFIX_URL');
export const AUTH_INTERCEPTOR_CONFIG = new InjectionToken<AuthInterceptorConfig>('AUTH_INTERCEPTOR_CONFIG');
