import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from '../shared/endpoints';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  login(username: string, password: string) {
    return this.http.post(ENDPOINTS.OAUTH_TOKEN, {
      grant_type: 'password',
      client_id: environment.oauthClientId,
      username,
      password,
      scope: '*',
    });
  }

  constructor(private http: HttpClient) {
  }
}
