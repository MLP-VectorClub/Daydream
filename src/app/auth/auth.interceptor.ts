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
    const cookieValue = this.cookies.get(CSRF_COOKIE_NAME);
    if (cookieValue)
      req.headers.append(`X-${CSRF_COOKIE_NAME}`, cookieValue);
    return next.handle(req);
  }
}
