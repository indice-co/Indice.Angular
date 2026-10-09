import { Injectable, inject } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { APP_SETTINGS_MANIFEST_URL } from './tokens';
import { IAppSettings } from './types';
@Injectable({
    providedIn: 'root',
})
export class SettingsDataService {
    private http: HttpClient;
    private APP_SETTINGS_MANIFEST_URL = inject(APP_SETTINGS_MANIFEST_URL);
    constructor(handler: HttpBackend) {
        this.http = new HttpClient(handler);
    }

    getAppSettings() {
        return this.http.get<IAppSettings>(this.APP_SETTINGS_MANIFEST_URL);
    }
}

export interface AppSettingsState {
    settings: IAppSettings | null;
}
