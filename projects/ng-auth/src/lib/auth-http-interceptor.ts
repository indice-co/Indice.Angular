import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Inject, Injectable, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_INTERCEPTOR_CONFIG } from './tokens';
import { AuthInterceptorConfig } from './types';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject(Router) private router: Router,
    @Optional() @Inject(AUTH_INTERCEPTOR_CONFIG) private config?: AuthInterceptorConfig,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authRequest = null;
    if (request.url.indexOf('i18n') >= 0) {
      authRequest = request;
    } else {
      authRequest = request.clone({
        headers: request.headers.set('Authorization', this.authService.getAuthorizationHeaderValue()),
        params: request.params,
      });
    }
    return next.handle(authRequest).pipe(
      catchError((error: any) => {
        if (error?.status === 401) {
          this.authService.removeUser().subscribe({
            next: () => {
              if (this.config?.onUnauthorized) {
                this.config.onUnauthorized(this.authService);
              } else {
                this.authService.signoutRedirect();
              }
            },
            error: (err) => console.error('Failed to remove user on 401:', err),
          });
        }
        if (error?.status === 403) {
          this.router.navigate(['/forbidden']);
        }
        throw error;
      }),
    );
  }
}
