import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutComponent, NotFoundComponent } from './components';
import { MateriaModule } from '../shared';

const components = [LayoutComponent, NotFoundComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, HttpClientModule, MateriaModule, RouterModule],
  exports: [...components],
  providers: [],
})
export class CoreModule {}
