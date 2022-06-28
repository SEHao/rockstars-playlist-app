import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreatePlaylistComponent } from './create-playlist';
import { PlaylistDetailsComponent } from './playlist-details';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create' },
  { path: 'create', component: CreatePlaylistComponent },
  { path: ':id', component: PlaylistDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaylistRoutingModule {}
