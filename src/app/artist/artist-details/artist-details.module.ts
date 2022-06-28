import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MateriaModule } from '@shared/material.module';

import { ArtistDetailsComponent } from './artist-details.component';

@NgModule({
  imports: [CommonModule, MateriaModule],
  declarations: [ArtistDetailsComponent],
})
export class ArtistDetailsModule {}
