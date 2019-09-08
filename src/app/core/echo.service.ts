import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EchoService {
  private echo: Echo;

  constructor() {
    this.echo = new Echo({
      broadcaster: 'pusher',
      forceTLS: true,
      ...environment.pusher,
    });
  }
}
