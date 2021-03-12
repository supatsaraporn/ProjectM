import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddarticlePageRoutingModule } from './addarticle-routing.module';

import { AddarticlePage } from './addarticle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddarticlePageRoutingModule
  ],
  declarations: [AddarticlePage]
})
export class AddarticlePageModule {}
