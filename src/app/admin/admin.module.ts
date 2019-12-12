import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './adminoverzicht/adminoverzicht.component';
import {AdminopdrachtenbeherenComponent} from './adminopdrachtenbeheren/adminopdrachtenbeheren.component';
import {AdminbedrijvenbeherenComponent} from './adminbedrijvenbeheren/adminbedrijvenbeheren.component';
import {AdminmakersbeherenComponent} from './adminmakersbeheren/adminmakersbeheren.component';
import {AdminreviewsbeherenComponent} from './adminreviewsbeheren/adminreviewsbeheren.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminopdrachtenbeherenComponent,
    AdminbedrijvenbeherenComponent,
    AdminmakersbeherenComponent,
    AdminreviewsbeherenComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule {
}
