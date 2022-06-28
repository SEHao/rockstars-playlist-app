import { Component, Input, OnInit } from '@angular/core';
import { PlaylistService } from '@core/services';

@Component({
  selector: 'app-playlist-overview',
  template: `
    <h2 class="h4 sidenav-title">Playlist</h2>
    <mat-nav-list sideContent>
      <a mat-list-item role="listitem" [routerLink]="['/playlist/create']"
        ><span class="playlist-create">Create Playlist</span
        ><mat-icon>add</mat-icon></a
      >
      <ng-container *ngFor="let playlist of playlists$ | async">
        <mat-divider></mat-divider>
        <a
          mat-list-item
          role="listitem"
          [routerLink]="['/playlist', playlist.id]"
          ><span class="playlist-name">{{ playlist.name }}</span>
          <mat-icon>fast_forward</mat-icon></a
        >
      </ng-container>
    </mat-nav-list>
  `,
  styleUrls: ['./playlist-overview.component.scss'],
})
export class PlaylistOverviewComponent {
  playlists$ = this.playlistService.playlists$;

  constructor(private readonly playlistService: PlaylistService) {}
}
