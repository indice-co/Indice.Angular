import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TenantService {
    private _tenantSubject: BehaviorSubject<string> = new BehaviorSubject('');

    constructor() { }

    public storeTenant(tenant: string): void {
        this._tenantSubject.next(tenant);
    }

    public getTenant(): Observable<string> {
        return this._tenantSubject.asObservable();
    }

    public getTenantValue(): string {
        return this._tenantSubject.getValue();
    }
}
