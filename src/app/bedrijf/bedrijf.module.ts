import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MaakopdrachtComponent} from './maakopdracht/maakopdracht.component';
import {CommonModule} from '@angular/common';
import { TagsComponent } from './tags/tags.component';
import { ReviewComponent } from './review/review.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    MaakopdrachtComponent,
    TagsComponent,
    ReviewComponent,
    DashboardComponent
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
