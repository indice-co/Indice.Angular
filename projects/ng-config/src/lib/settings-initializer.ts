import {
  APP_INITIALIZER,
  EnvironmentProviders,
  Injector,
  makeEnvironmentProviders
} from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsFacadeService } from './settings-facade.service';
import { APP_ENVIRONMENT, APP_PROVIDERS_ARRAY, APP_SETTINGS, APP_SETTINGS_MANIFEST_URL, IAUTH_SETTINGS } from './tokens';
import { AppProvidersArray, IAppSettings } from './types';

export function initializeAppSettings(
  appSettingsFacade: SettingsFacadeService,
) {
  return async () => {
    // Wait for settings to load
    const success = await lastValueFrom(appSettingsFacade.loadSettings());

    if (success) {
      const dependencies = appSettingsFacade.getAppDependencies() as any[];
      // Create a child injector with the dependencies
      Injector.create({ providers: dependencies });
    } else {
      console.error('Failed to initialize app settings.');
      throw new Error('App settings could not be loaded.');
    }
  };
}

export function provideAppSettings(config: AppProvidersArray = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_SETTINGS_MANIFEST_URL,
      useValue: '/app-settings.manifest.json'
    },
    {
      provide: APP_PROVIDERS_ARRAY,
      useValue: config.dependencies || []
    },
    {
      provide: APP_SETTINGS, 
      useValue: {} // Provide an empty object initially
    },
    {
      provide: APP_ENVIRONMENT,
      useValue: {}
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppSettings,
      deps: [SettingsFacadeService], // Add Injector to deps
      multi: true,
    },
    {
      provide: IAUTH_SETTINGS,
      useFactory: (runtimeSettings: IAppSettings) => runtimeSettings.auth_settings,
      deps: [APP_SETTINGS],
    }
  ]);
}