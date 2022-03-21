import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  constructor(@Inject(AuthService) private authService: AuthService, @Inject(Router) private router: Router) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authRequest = null;
    if (request.url.indexOf('i18n') >= 0) {
      authRequest = request;
    } else {
      authRequest = request.clone({
        headers: request.headers.set('Authorization', this.authService.getAuthorizationHeaderValue()),
        params: request.params
      });
    }
    return next.handle(authRequest).pipe(
      tap((httpEvent: HttpEvent<any>) => {
        if (httpEvent instanceof HttpResponse) { }
      }),
      catchError((error: any) => {
        if (error?.status === 401) {
          this.authService.removeUser().pipe(map(() => this.authService.signoutRedirect())).subscribe();
        }
        if (error?.status === 403) {
          this.router.navigate(['/forbidden']);
        }
        throw error;
      })
    );
  }
}
