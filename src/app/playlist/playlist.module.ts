import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreatePlaylistModule } from './create-playlist';
import { PlaylistDetailsModule } from './playlist-details';
import { PlaylistRoutingModule } from './playlist-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PlaylistRoutingModule,
    CreatePlaylistModule,
    PlaylistDetailsModule,
  ],
})
export class PlaylistModule {}
