import { getLocaleDateTimeFormat } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TenantService {
    private instanceId = new Date().toLocaleTimeString();
    private subject: BehaviorSubject<string> = new BehaviorSubject('');
    constructor() {
      // console.log('TenantService created: ', this.instanceId);
    }


    public storeTenant(tenant: string): void {
        // console.log('TenantService storing tenant: ', tenant, this.instanceId);
        this.subject.next(tenant);
    }

    public getTenant(): Observable<string> {
        // console.log('TenantService get tenant: ', this.instanceId);
        return this.subject.asObservable();
    }
}
