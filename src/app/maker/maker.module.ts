import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpdrachtenComponent } from './opdrachten/opdrachten.component';
import { FilterComponent } from './filter/filter.component';
import { OpdrachtenLijstComponent } from './opdrachten-lijst/opdrachten-lijst.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfielComponent } from './profiel/profiel.component';
import { SkillsComponent } from './skills/skills.component';
import { ReviewComponent } from './review/review.component';



@NgModule({
  declarations: [
    OpdrachtenComponent,
    FilterComponent,
    OpdrachtenLijstComponent,
    DashboardComponent,
    ProfielComponent,
    SkillsComponent,
    ReviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  exports: [
    OpdrachtenComponent
  ]
})
export class MakerModule { }
