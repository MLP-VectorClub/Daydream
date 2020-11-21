import { IncomingMessage } from 'http';
import { AxiosRequestConfig } from 'axios';

export class Service {
  protected request?: IncomingMessage;

  constructor(req?: IncomingMessage) {
    this.request = req;
  }

  protected getRequestOptions(): undefined | AxiosRequestConfig {
    if (this.request) {
      return {
        headers: {
          cookie: this.request.headers.cookie,
        },
      };
    }
  }
}
