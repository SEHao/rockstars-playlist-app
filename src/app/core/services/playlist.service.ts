import { BehaviorSubject, map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Playlist } from '@core/models';
import { nanoid } from 'nanoid';

@Injectable({ providedIn: 'root' })
export class PlaylistService {
  private _playlists = new BehaviorSubject<Playlist[]>([]);
  readonly playlists$ = this._playlists.asObservable();
  private _storageKey = 'playlists';

  get playlists() {
    return this._playlists.getValue();
  }
  set playlists(value: Playlist[]) {
    this._playlists.next(value);
  }

  constructor() {
    this.fetch();
  }

  findOne(id: string): Observable<Playlist | undefined> {
    return this.playlists$.pipe(map(p => p.find(pl => pl.id === id)));
  }

  createPlaylist(name: string): Playlist {
    const playlist: Playlist = {
      id: nanoid(),
      name,
      songs: [],
    };
    this.playlists.push(playlist);
    this.save();
    return playlist
  }

  addSong(playlistId: string, songId: number, force: boolean = false): void {
    const playlist = this.playlists.find((p) => p.id === playlistId);

    if (!playlist) throw new Error('Error: Enable to find playlist');
    if (!force && playlist.songs.some((s) => s === songId))
      throw new Error('Error: Song is already in playlist');

    playlist.songs.push(songId);
    this.save();
  }

  removeSong(playlistId: string, songId: number): void {
    const playlistIndex = this.playlists.findIndex((p) => p.id === playlistId);

    if (playlistIndex < 0) throw new Error('Error: Enable to find playlist');

    const playlist = this.playlists[playlistIndex];
    playlist.songs = playlist.songs.filter((s) => s !== songId);
    this.save();
  }

  deletePlaylist(playlistId: string): void {
    this.playlists = this.playlists.filter((p) => p.id !== playlistId);
    this.save();
  }

  fetch(): void {
    const jsonString = localStorage.getItem(this._storageKey);
    if (!jsonString) return;
    this.playlists = JSON.parse(jsonString);
  }

  save(): void {
    localStorage.setItem(this._storageKey, JSON.stringify(this.playlists));
  }
}
