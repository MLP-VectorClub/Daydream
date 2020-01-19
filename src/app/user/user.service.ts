import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from 'app/shared/endpoints';
import { User } from 'app/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getMe(): Observable<User> {
    return this.http.get<User>(ENDPOINTS.USERS_ME);
  }

  logout() {
    return this.http.post(ENDPOINTS.USERS_LOGOUT, null);
  }
}
