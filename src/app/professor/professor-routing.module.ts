import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfessorPage } from './professor.page';

const routes: Routes = [
  {
    path: '',
    component: ProfessorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfessorPageRoutingModule {}
