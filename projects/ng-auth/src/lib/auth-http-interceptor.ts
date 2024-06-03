import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  constructor(@Inject(AuthService) private authService: AuthService, @Inject(Router) private router: Router) { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
      map((httpEvent: any) => {
        return httpEvent;
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
