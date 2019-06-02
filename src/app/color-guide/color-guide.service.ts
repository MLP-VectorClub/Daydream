import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from 'app/shared/endpoints';
import { QueryPublicAppearancesRequest, QueryPublicAppearancesResult } from 'app/types';

@Injectable()
export class ColorGuideService {
  constructor(private http: HttpClient) {
  }

  getAll(params: QueryPublicAppearancesRequest) {
    return this.http.get<QueryPublicAppearancesResult>(ENDPOINTS.APPEARANCES(params));
  }
}
