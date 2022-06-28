import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MateriaModule } from '@shared';

import { PlaylistDetailsComponent } from './playlist-details.component';

@NgModule({
  imports: [CommonModule, MateriaModule],
  declarations: [PlaylistDetailsComponent],
})
export class PlaylistDetailsModule {}
