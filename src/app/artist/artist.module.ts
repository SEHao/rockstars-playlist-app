import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ArtistComponent } from './artist.component';
import { ArtistRoutingModule } from './artist-routing.module';
import { MateriaModule } from '@shared';
import { ArtistDetailsModule } from './artist-details';

@NgModule({
  declarations: [ArtistComponent],
  imports: [
    CommonModule,
    MateriaModule,
    ArtistRoutingModule,
    ArtistDetailsModule,
  ],
})
export class ArtistModule {}
