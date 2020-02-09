import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from 'app/shared/endpoints';
import {
  GetUsersMeResult,
  PostUsersLoginRequest,
  PostUsersLoginResult,
  PostUsersLogoutResult,
  PostUsersRequest,
  PostUsersResult
} from 'app/types';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getMe() {
    return this.http.get<GetUsersMeResult>(ENDPOINTS.USERS_ME);
  }

  login(data: PostUsersLoginRequest) {
    return this.http.post<PostUsersLoginResult>(ENDPOINTS.USERS_LOGIN, data);
  }

  logout() {
    return this.http.post<PostUsersLogoutResult>(ENDPOINTS.USERS_LOGOUT, null);
  }

  register(data: PostUsersRequest) {
    return this.http.post<PostUsersResult>(ENDPOINTS.USERS, data);
  }
}
