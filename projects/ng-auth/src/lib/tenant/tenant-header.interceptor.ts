import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { TenantService } from './tenant-service';
import { TENANT_PREFIX_URL } from '../tokens';

@Injectable({ providedIn: 'root' })
export class TenantHeaderInterceptor implements HttpInterceptor {
    constructor(
        @Inject(TENANT_PREFIX_URL) private tenantPrefixUrl: string,
        @Inject(TenantService) private tenantStore: TenantService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let clonedRequest = request;
        // First check if request is going to our API or an external call.
        if (request.urlWithParams.toLowerCase().startsWith(this.tenantPrefixUrl.toLowerCase())) {
            this.tenantStore.getTenant().subscribe((tenant: any) => {
                if (tenant !== null || tenant !== '') {
                    // Clone the request to add the new header.
                    clonedRequest = request.clone({ 
                        headers: request.headers.append('X-Tenant-Id', `${tenant}`) 
                    });
                }
            })
            .unsubscribe();
        }
        // Pass the cloned request instead of the original request to the next handle.
        return next.handle(clonedRequest);
    }
}
