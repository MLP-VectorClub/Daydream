import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {

  constructor(@Optional() @Inject(REQUEST) protected request: Request) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let serverReq: HttpRequest<any> = req;
    if (this.request) {
      let newUrl = `${this.request.protocol}://${this.request.get('host')}`;
      if (!req.url.startsWith('/'))
        newUrl += '/';
      newUrl += req.url;
      const headers = new HttpHeaders();
      if (this.request.headers.cookie)
        headers.append('cookie', this.request.headers.cookie);
      serverReq = req.clone({ url: newUrl, headers });
    }
    return next.handle(serverReq);
  }
}
