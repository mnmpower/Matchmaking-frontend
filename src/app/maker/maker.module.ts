import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpdrachtenComponent } from './opdrachten/opdrachten.component';
import { FilterComponent } from './filter/filter.component';
import { OpdrachtenLijstComponent } from './opdrachten-lijst/opdrachten-lijst.component';




@NgModule({
  declarations: [
    OpdrachtenComponent,
    FilterComponent,
    OpdrachtenLijstComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OpdrachtenComponent
  ]
})
export class MakerModule { }
