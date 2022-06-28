import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Artist, ArtistFilter } from '@core/models';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class ArtistService {
  private readonly url = environment.backendUrl + 'artists';

  private readonly loading = new Subject<boolean>();
  readonly loading$ = this.loading.asObservable();

  constructor(private httpClient: HttpClient) {}

  findAll(
    page: number = 1,
    limit: number = 10,
    filter?: ArtistFilter
  ): Observable<Artist[]> {
    const params = { _page: page, _limit: limit, ...filter };
    return this.httpClient.get<Artist[]>(this.url, { params });
  }
}
