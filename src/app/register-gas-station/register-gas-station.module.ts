import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterGasStationPageRoutingModule } from './register-gas-station-routing.module';

import { RegisterGasStationPage } from './register-gas-station.page';
import { HttpClientModule } from '@angular/common/http';
import { DbService } from '../services/db.service';
import { GasService } from '../services/gas.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ReactiveFormsModule,
    RegisterGasStationPageRoutingModule
  ],
  declarations: [RegisterGasStationPage],
  providers: [GasService, DbService]
})
export class RegisterGasStationPageModule {}
