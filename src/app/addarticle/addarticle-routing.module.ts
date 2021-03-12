import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddarticlePage } from './addarticle.page';

const routes: Routes = [
  {
    path: '',
    component: AddarticlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddarticlePageRoutingModule {}
