import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from 'app/shared/endpoints';
import { GetAllAppearancesRequest, GetAllAppearancesResult } from 'app/types';

@Injectable()
export class ColorGuideService {
  constructor(private http: HttpClient) {
  }

  getAll(params: GetAllAppearancesRequest) {
    return this.http.get<GetAllAppearancesResult>(ENDPOINTS.APPEARANCES(params));
  }
}
