import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-layout [title]="title">
      <app-playlist-overview sideNavContent></app-playlist-overview>
      <router-outlet></router-outlet>
    </app-layout>
  `,
})
export class AppComponent {
  title = 'Team Rockstars IT';
}
