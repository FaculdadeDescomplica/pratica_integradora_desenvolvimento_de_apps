import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuelPage } from './fuel.page';

const routes: Routes = [
  {
    path: '',
    component: FuelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuelPageRoutingModule {}
