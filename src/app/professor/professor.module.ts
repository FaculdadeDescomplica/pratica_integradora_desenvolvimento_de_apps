import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfessorPageRoutingModule } from './professor-routing.module';

import { ProfessorPage } from './professor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfessorPageRoutingModule
  ],
  declarations: [ProfessorPage]
})
export class ProfessorPageModule {}
