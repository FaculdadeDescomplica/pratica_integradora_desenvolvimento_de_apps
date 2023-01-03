import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterGasStationPage } from './register-gas-station.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterGasStationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterGasStationPageRoutingModule {}
