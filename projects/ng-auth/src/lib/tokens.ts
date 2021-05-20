import { InjectionToken } from '@angular/core';
import { IAuthSettings } from './types';

export const AUTH_SETTINGS = new InjectionToken<IAuthSettings>('AUTH_SETTINGS');
