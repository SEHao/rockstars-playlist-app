import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Playlist, Song } from '@core/models';
import { PlaylistService, SongService } from '@core/services';
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-playlist-details',
  template: `
    <div class="container mt-2" *ngIf="playlist$ | async as playlist">
      <h1>{{ playlist.name }}</h1>
      <table
        mat-table
        [dataSource]="(songs$ | async) || []"
        class="song-table mat-elevation-z1"
      >
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let song">{{ song.name }}</td>
        </ng-container>

        <ng-container matColumnDef="artist">
          <th mat-header-cell *matHeaderCellDef>Artist</th>
          <td mat-cell *matCellDef="let song">{{ song.artist }}</td>
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
            <button mat-icon-button (click)="removeSongFromPlaylist(song)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
      <div class="mt-4">
        <button
          mat-raised-button
          color="warn"
          (click)="deletePlaylist(playlistId)"
        >
          Delete playlist
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./playlist-details.component.scss'],
})
export class PlaylistDetailsComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject<void>();
  playlistId = this.route.snapshot.params['id'];
  playlist$: Observable<Playlist | undefined> = of();
  title = 'Playlist';

  private _songs = new BehaviorSubject<Song[]>([]);
  songs$ = this._songs.asObservable();

  displayedColumns: string[] = [
    'name',
    'artist',
    'album',
    'year',
    'genre',
    'duration',
    'action',
  ];

  getSongsDetails$ = this.playlist$.pipe(
    switchMap((p) => this.songService.findByIds(p?.songs || [])),
    takeUntil(this.unsubscribe)
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly playlistService: PlaylistService,
    private readonly songService: SongService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((p) => p.get('id')),
        switchMap((id) => {
          if (!id) return of();
          this.playlist$ = this.playlistService.findOne(id);
          return this.playlist$;
        }),
        switchMap((p) => this.songService.findByIds(p?.songs || [])),
        takeUntil(this.unsubscribe)
      )
      .subscribe((songs) => {
        this._songs.next(songs);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete;
  }

  removeSongFromPlaylist(song: Song): void {
    this.playlist$
      .pipe(
        switchMap((p) => {
          if (!p || !song.id) return of(null);
          this.playlistService.removeSong(p.id, song.id);
          return this.songService.findByIds(p?.songs || []);
        }),
        takeUntil(this.unsubscribe)
      )
      .subscribe((songs) => {
        if (!songs) return;
        this._songs.next(songs);
      });
  }

  deletePlaylist(id: string): void {
    this.playlistService.deletePlaylist(id);
    this.router.navigate(['/']);
  }
}
