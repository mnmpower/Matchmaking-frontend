import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MaakopdrachtComponent} from './maakopdracht/maakopdracht.component';
import {CommonModule} from '@angular/common';
import { TagsComponent } from './tags/tags.component';
import { ReviewComponent } from './review/review.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfielComponent } from './profiel/profiel.component';
import { RouterModule } from '@angular/router';
import { MakerProfielComponent } from './maker-profiel/maker-profiel.component';
import { EditOpdrachtComponent } from './edit-opdracht/edit-opdracht.component';
import { OpdrachtComponent } from './opdracht/opdracht.component';
import { ReviewSchrijvenComponent } from './review-schrijven/review-schrijven.component';



@NgModule({
  declarations: [
    MaakopdrachtComponent,
    TagsComponent,
    ReviewComponent,
    DashboardComponent,
    ProfielComponent,
    MakerProfielComponent,
    EditOpdrachtComponent,
    OpdrachtComponent,
    ReviewSchrijvenComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    MaakopdrachtComponent
  ],
})
export class BedrijfModule { }
