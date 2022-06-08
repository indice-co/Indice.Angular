import { InjectionToken } from '@angular/core';
import { IAppLinks, IAppLanguagesService, IAppNotifications, IShellConfig } from './types';

export const APP_LINKS = new InjectionToken<IAppLinks>('APP_LINKS');
export const APP_NOTIFICATIONS = new InjectionToken<IAppNotifications>('APP_NOTIFICATIONS');
export const SHELL_CONFIG = new InjectionToken<IShellConfig>('SHELL_CONFIG');
export const APP_LANGUAGES = new InjectionToken<IAppLanguagesService>('APP_LANGUAGES');
