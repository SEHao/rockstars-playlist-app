import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlaylistService } from '@core/services/playlist.service';

@Component({
  selector: 'app-create-playlist',
  template: `
    <div class="container mt-2">
      <h1>Create playlist</h1>

      <form>
        <mat-form-field class="playlist-form" appearance="fill">
          <mat-label>Playlist name</mat-label>
          <input
            class="playlist-form-input-name"
            matInput
            id="playlistName"
            name="playlistName"
            placeholder="name"
            [(ngModel)]="inputPlaylistName"
            required
            #playlistName="ngModel"
          />
          <mat-error
            *ngIf="
              playlistName.invalid &&
              (playlistName.dirty || playlistName.touched)
            "
          >
            Playlist name is <strong>required</strong>
          </mat-error>
        </mat-form-field>
        <div>
          <button
            class="ml-auto"
            mat-raised-button
            color="primary"
            [disabled]="playlistName.invalid"
            (click)="createPlaylist(inputPlaylistName)"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./create-playlist.component.scss'],
})
export class CreatePlaylistComponent {
  inputPlaylistName = '';

  constructor(
    private readonly playlistService: PlaylistService,
    private readonly router: Router
  ) {}

  createPlaylist(name: string): void {
    const createdPlaylist = this.playlistService.createPlaylist(name);
    this.router.navigate(['/playlist', createdPlaylist.id]);
  }
}
