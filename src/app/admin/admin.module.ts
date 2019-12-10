import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin-overzicht/admin-overzicht.component';
import { AdminopdrachtenbeherenComponent } from './adminopdrachtenbeheren/adminopdrachtenbeheren.component';
import { AdminbedrijvenbeherenComponent } from './adminbedrijvenbeheren/adminbedrijvenbeheren.component';
import { AdminmakersbeherenComponent } from './adminmakersbeheren/adminmakersbeheren.component';
import { AdminreviewsbeherenComponent } from './adminreviewsbeheren/adminreviewsbeheren.component';
import { AdminskillsbeherenComponent } from './adminskillsbeheren/adminskillsbeheren.component';
import { AdmintagsbeherenComponent } from './admintagsbeheren/admintagsbeheren.component';
import { AdmintypesbeherenComponent } from './admintypesbeheren/admintypesbeheren.component';



@NgModule({
  declarations: [AdminComponent, AdminopdrachtenbeherenComponent, AdminbedrijvenbeherenComponent, AdminmakersbeherenComponent, AdminreviewsbeherenComponent, AdminskillsbeherenComponent, AdmintagsbeherenComponent, AdmintypesbeherenComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
