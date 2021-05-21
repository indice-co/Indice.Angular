import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

// for use with HTTPCLIENT!
@Injectable({
  providedIn: 'root'
})
export class AuthHttpInterceptor implements HttpInterceptor {
  private progress = 0;
  constructor(@Inject(AuthService) private authService: AuthService, @Inject(Router) private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authRequest = null;
    if (request.url.indexOf('i18n') >= 0 ) {
      authRequest = request;
    } else {
      authRequest = request.clone({ headers: request.headers.set('Authorization', this.authService.getAuthorizationHeaderValue()),
      params: request.params });
    }
    return next.handle(authRequest).pipe(finalize(() => {
    }), catchError((err: any) => {
        console.log(' error caught in interceptor : ', err);
      // return the error to the method that called it
        if (err && err.status && (err.status === 401 || err.status === 403)) {
        this.router.navigate(['/forbidden']);
      }
        throw(err);
    }));
  }
}
