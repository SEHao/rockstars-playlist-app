import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MateriaModule } from '@shared';

import { CreatePlaylistComponent } from './create-playlist.component';

@NgModule({
  imports: [CommonModule, MateriaModule, FormsModule],
  declarations: [CreatePlaylistComponent],
})
export class CreatePlaylistModule {}
