import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Song } from '@core/models';

@Injectable({ providedIn: 'root' })
export class SongService {
  private readonly url = environment.backendUrl + 'songs';

  constructor(private httpClient: HttpClient) {}

  findByArtist(artist: string): Observable<Song[]> {
    const params = { artist };
    return this.httpClient.get<Song[]>(this.url, { params });
  }

  findByIds(ids: number[]): Observable<Song[]> {
    const query = ids.join('&id=');
    return this.httpClient.get<Song[]>(`${this.url}?id=${query}`);
  }
}
