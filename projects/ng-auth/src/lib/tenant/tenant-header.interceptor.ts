import { Inject, Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { TenantService } from './tenant-service';
import { TENANT_PREFIX_URL } from '../tokens';

@Injectable({providedIn: 'root'})
export class TenantHeaderInterceptor implements HttpInterceptor {
    constructor(@Inject(TENANT_PREFIX_URL) private tenantPrefixUrl: string, @Inject(TenantService) private tenantStore: TenantService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(req);
        let clonedRequest = req;
        // First check if request is going to our api or an external
        if (req.urlWithParams.toLowerCase().startsWith(this.tenantPrefixUrl.toLowerCase())) {
            this.tenantStore.getTenant().subscribe((tenant: any) => {
                console.log(tenant);
                if (tenant !== null || tenant !== '') {
                    // Clone the request to add the new header
                    clonedRequest = req.clone({ headers: req.headers.append('X-Tenant-Id', `${tenant}`) });
                }
            });
        }
        // Pass the cloned request instead of the original request to the next handle
        return next.handle(clonedRequest);
    }
}
