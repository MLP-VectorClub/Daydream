import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserPrefsService {

  set(setting: string, value) {
    // TODO
    return this.http.post('/TBD', { setting, value });
  }

  constructor(private http: HttpClient) {
  }
}
