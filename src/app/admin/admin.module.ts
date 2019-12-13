import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './adminoverzicht/adminoverzicht.component';
import {AdminopdrachtenbeherenComponent} from './adminopdrachtenbeheren/adminopdrachtenbeheren.component';
import {AdminbedrijvenbeherenComponent} from './adminbedrijvenbeheren/adminbedrijvenbeheren.component';
import {AdminmakersbeherenComponent} from './adminmakersbeheren/adminmakersbeheren.component';
import {AdminreviewsbeherenComponent} from './adminreviewsbeheren/adminreviewsbeheren.component';
import { BedrijfProfielComponent } from './bedrijf-profiel/bedrijf-profiel.component';
import { MakerProfielComponent } from './maker-profiel/maker-profiel.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    AdminopdrachtenbeherenComponent,
    AdminbedrijvenbeherenComponent,
    AdminmakersbeherenComponent,
    AdminreviewsbeherenComponent,
    BedrijfProfielComponent,
    MakerProfielComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class AdminModule {
}
