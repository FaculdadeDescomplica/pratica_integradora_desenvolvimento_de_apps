import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FuelPageRoutingModule } from './fuel-routing.module';

import { FuelPage } from './fuel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FuelPageRoutingModule
  ],
  declarations: [FuelPage]
})
export class FuelPageModule {}
