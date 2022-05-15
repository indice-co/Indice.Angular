import { InjectionToken } from '@angular/core';
import { IAppLinks, IShellConfig } from './types';

export const APP_LINKS = new InjectionToken<IAppLinks>('APP_LINKS');
export const APP_NOTIFICATIONS = new InjectionToken<IAppLinks>('APP_NOTIFICATIONS');
export const SHELL_CONFIG = new InjectionToken<IShellConfig>('SHELL_CONFIG');
