import { IncomingMessage } from 'http';
import { AxiosRequestConfig } from 'axios';
import { pick } from 'lodash';
import { APP_HOST } from 'src/config';

export class Service {
  protected request?: IncomingMessage;

  constructor(req?: IncomingMessage) {
    this.request = req;
  }

  protected getRequestOptions(): undefined | AxiosRequestConfig {
    if (this.request) {
      if (!this.request?.headers?.referer) {
        if (!this.request.headers) {
          this.request.headers = {};
        }
        this.request.headers.referer = APP_HOST;
      }
      return {
        headers: pick(this.request?.headers, ['authorization', 'referer', 'origin', 'cookie']),
      };
    }
  }
}
