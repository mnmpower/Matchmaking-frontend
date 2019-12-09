import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { MaakopdrachtComponent } from './maakopdracht/maakopdracht.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';



@NgModule({
  declarations: [
    MaakopdrachtComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    MaakopdrachtComponent
  ],
})
export class BedrijfModule { }
