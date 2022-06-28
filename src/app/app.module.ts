import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ArtistModule } from './artist';
import { CoreModule } from './core';
import { ArtistDetailsModule } from './artist/artist-details';
import { PlaylistOverviewComponent } from './components';
import { MateriaModule } from '@shared';

@NgModule({
  declarations: [AppComponent, PlaylistOverviewComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    MateriaModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
