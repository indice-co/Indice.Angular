import { Injectable } from '@angular/core';

import { UserSettingKey } from '../types';

@Injectable({
    providedIn: 'root'
})
export class UserSettingsService {
    private static SETTINGS_KEY = '@indice/ng-components_user-settings';

    private _defaultPreferences: { [key in UserSettingKey]: any } = {
        'MobileSideBar': true
    };

    public getAll(): { [key in UserSettingKey]: any } {
        const settingsJson = localStorage.getItem(UserSettingsService.SETTINGS_KEY);
        if (settingsJson) {
            return JSON.parse(settingsJson);
        }
        return this._defaultPreferences;
    }

    public get(key: UserSettingKey): any { 
        const settings = this.getAll();
        return settings[key];
    }

    public set(key: UserSettingKey, value: any): void {
        const settings = this.getAll();
        settings[key] = value;
        localStorage.setItem(UserSettingsService.SETTINGS_KEY, JSON.stringify(settings));
    }
}
