import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from '../shared/endpoints';

@Injectable()
export class AuthService {

  login(username: string, password: string) {
    return this.http.post(ENDPOINTS.USERS_LOGIN, {
      username,
      password,
    });
  }

  constructor(private http: HttpClient) {
  }
}
