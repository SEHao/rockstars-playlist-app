import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@core/components';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'artist' },
  {
    path: 'artist',
    loadChildren: () =>
      import('./artist/artist.module').then((m) => m.ArtistModule),
  },
  {
    path: 'playlist',
    loadChildren: () =>
      import('./playlist/playlist.module').then((m) => m.PlaylistModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
