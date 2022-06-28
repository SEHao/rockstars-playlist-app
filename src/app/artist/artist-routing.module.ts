import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistDetailsComponent } from './artist-details';
import { ArtistComponent } from './artist.component';

const routes: Routes = [
  { path: '', component: ArtistComponent },
  { path: ':id', component: ArtistDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistRoutingModule {}
