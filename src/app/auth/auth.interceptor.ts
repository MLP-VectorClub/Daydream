import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { CSRF_COOKIE_NAME } from '../app.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookies: CookieService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const setHeaders = {};
    const cookieValue = this.cookies.get(CSRF_COOKIE_NAME);
    if (cookieValue)
      setHeaders[`X-${CSRF_COOKIE_NAME}`] = cookieValue;
    setHeaders['X-App-Origin'] = window.location.origin;
    return next.handle(req.clone({ setHeaders }));
  }
}
