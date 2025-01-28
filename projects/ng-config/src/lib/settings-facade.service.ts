import {
    computed,
    Inject,
    inject,
    Injectable,
    signal
} from '@angular/core';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSettingsState, SettingsDataService } from './settings.service';
import { IAppSettings, IAuthSettings, AppProvidersArray } from './types';
import { APP_ENVIRONMENT, APP_SETTINGS, APP_PROVIDERS_ARRAY, IAUTH_SETTINGS } from './tokens';

const initialState: Readonly<AppSettingsState> = {
    settings: {
        isServed: false,
        api_url: '',
        api_docs: '',
        auth_settings: {} as IAuthSettings,
        culture: '',
        isTemplate: false,
        production: false,
        version: ''
    },
};

@Injectable({
    providedIn: 'root',
})
export class SettingsFacadeService {
    readonly #settingsDataService = inject(SettingsDataService);
    readonly #environment = inject(APP_ENVIRONMENT);

    readonly #state = signal(initialState);
    readonly settings = computed(() => this.#state().settings);

    constructor(
        @Inject(APP_SETTINGS) private tokenAppsettings: IAppSettings,
        @Inject(APP_PROVIDERS_ARRAY) private appProvidersArray: AppProvidersArray) { }

    getAppDependencies() {
        return this.appProvidersArray?.dependencies;
    }


    loadSettings(): Observable<boolean> {
        return this.#settingsDataService.getAppSettings().pipe(
            tap((settings) => console.log(settings)),
            map((settings) => {
                let runtimeSettings = merge(cloneDeep(this.#environment), settings);
                // Assign settings directly to the appSettings object
                Object.assign(this.tokenAppsettings, runtimeSettings);

                // Update the state
                this.#state.set({ settings: this.tokenAppsettings });

                return true; // Indicate successful loading
            }),
            catchError((error) => {
                // Log the error and provide fallback behavior
                console.error('Failed to load settings:', error);

                return of(false); // Return false to indicate failure
            })
        );
    }
}
