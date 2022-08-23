import { InjectionToken } from '@angular/core';

import { IAppLinks, IAppLanguagesService, IAppNotifications, IShellConfig } from './types';
import { LibStepperComponent } from './controls/stepper/lib-stepper.component';
import { LibTabGroupComponent } from './controls/tabs/lib-tab-group.component';

export const APP_LANGUAGES = new InjectionToken<IAppLanguagesService>('APP_LANGUAGES');
export const APP_LINKS = new InjectionToken<IAppLinks>('APP_LINKS');
export const APP_NOTIFICATIONS = new InjectionToken<IAppNotifications>('APP_NOTIFICATIONS');
export const LIBSTEPPER_ACCESSOR = new InjectionToken<LibStepperComponent>('LibStepperAccessor');
export const LIBTABGROUP_ACCESSOR = new InjectionToken<LibTabGroupComponent>('LibTabGroupAccessor');
export const SHELL_CONFIG = new InjectionToken<IShellConfig>('SHELL_CONFIG');
