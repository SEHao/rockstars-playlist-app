import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { Playlist, Song } from '@core/models';
import { PlaylistService, SongService } from '@core/services';

@Component({
  selector: 'app-artist-details',
  template: `
    <div class="container mt-2">
      <h1>{{ artistName }}</h1>
      <table
        mat-table
        [dataSource]="(songs | async) || []"
        class="song-table mat-elevation-z1"
      >
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let song">{{ song.name }}</td>
        </ng-container>

        <ng-container matColumnDef="album">
          <th mat-header-cell *matHeaderCellDef>Album</th>
          <td mat-cell *matCellDef="let song">{{ song.album }}</td>
        </ng-container>

        <ng-container matColumnDef="year">
          <th mat-header-cell *matHeaderCellDef>Year</th>
          <td mat-cell *matCellDef="let song">{{ song.year }}</td>
        </ng-container>

        <ng-container matColumnDef="genre">
          <th mat-header-cell *matHeaderCellDef>Genre</th>
          <td mat-cell *matCellDef="let song">{{ song.genre }}</td>
        </ng-container>

        <ng-container matColumnDef="duration">
          <th mat-header-cell *matHeaderCellDef>Duration</th>
          <td mat-cell *matCellDef="let song">
            {{ song.duration | date: 'mm:ss' }}
          </td>
        </ng-container>

        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef>&nbsp;</th>
          <td mat-cell *matCellDef="let song">
            <button mat-icon-button [matMenuTriggerFor]="menu">
              <mat-icon>add</mat-icon>
            </button>
            <mat-menu #menu="matMenu">
              <button
                mat-menu-item
                *ngFor="let playlist of playlists$ | async"
                (click)="addSongToPlaylist(playlist, song)"
              >
                {{ playlist.name }}
              </button>
            </mat-menu>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>
  `,
  styleUrls: ['./artist-details.component.scss'],
})
export class ArtistDetailsComponent {
  artistName = this.route.snapshot.params['id'];
  songs = this.songService.findByArtist(this.artistName);
  displayedColumns: string[] = [
    'name',
    'album',
    'year',
    'genre',
    'duration',
    'action',
  ];
  playlists$ = this.playlistService.playlists$;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly songService: SongService,
    private readonly playlistService: PlaylistService
  ) {}

  addSongToPlaylist(playlist: Playlist, song: Song): void {
    this.playlistService.addSong(playlist.id, song.id);
  }
}
