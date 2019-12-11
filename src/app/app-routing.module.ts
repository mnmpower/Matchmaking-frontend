import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WelkomComponent} from './welkom/welkom.component';
import {LoginComponent} from './login/login.component';
import {RegistreerComponent} from './registreer/registreer.component';

import {MaakopdrachtComponent} from './bedrijf/maakopdracht/maakopdracht.component';
import {DashboardComponent as DashboardBedrijf} from './bedrijf/dashboard/dashboard.component';
import {TagsComponent as TagsBedrijf} from './bedrijf/tags/tags.component';
import {ReviewComponent as ReviewBedrijf} from './bedrijf/review/review.component';

import {AdminComponent} from './admin/adminoverzicht/adminoverzicht.component';

import {DashboardComponent as DashboardMaker} from './maker/dashboard/dashboard.component';
import {ProfielComponent} from './maker/profiel/profiel.component';
import {TagsComponent as TagsMaker} from './maker/tags/tags.component';
import {ReviewComponent as ReviewMaker} from './maker/review/review.component';
import {OpdrachtenComponent} from './maker/opdrachten/opdrachten.component';
import { AdminbedrijvenbeherenComponent } from './admin/adminbedrijvenbeheren/adminbedrijvenbeheren.component';
import { AdminmakersbeherenComponent } from './admin/adminmakersbeheren/adminmakersbeheren.component';
import { AdminopdrachtenbeherenComponent } from './admin/adminopdrachtenbeheren/adminopdrachtenbeheren.component';
import { AdminreviewsbeherenComponent } from './admin/adminreviewsbeheren/adminreviewsbeheren.component';
import { AdminskillsbeherenComponent } from './admin/adminskillsbeheren/adminskillsbeheren.component';
import { AdmintagsbeherenComponent } from './admin/admintagsbeheren/admintagsbeheren.component';
import { AdmintypesbeherenComponent } from './admin/admintypesbeheren/admintypesbeheren.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';


const routes: Routes = [
  {path: '', component: WelkomComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registreer', component: RegistreerComponent},
  {path: 'forbidden', component: ForbiddenComponent},

  // authenticatien toevoegen bij alle onderstaande!!!
  {path: 'maker/dashboard', component: DashboardMaker},
  {path: 'maker/opdrachten', component: OpdrachtenComponent},
  {path: 'maker/profiel', component: ProfielComponent},
  {path: 'maker/tags', component: TagsMaker},
  {path: 'maker/reviews', component: ReviewMaker},

  {path: 'bedrijf/dashboard', component: DashboardBedrijf},
  {path: 'bedrijf/maakopdracht', component: MaakopdrachtComponent},
  {path: 'bedrijf/tags', component: TagsBedrijf},
  {path: 'bedrijf/reviews', component: ReviewBedrijf},

  {path: 'admin/overzicht', component: AdminComponent},
  {path: 'admin/bedrijven', component: AdminbedrijvenbeherenComponent},
  {path: 'admin/makers', component: AdminmakersbeherenComponent},
  {path: 'admin/opdrachten', component: AdminopdrachtenbeherenComponent},
  {path: 'admin/reviews', component: AdminreviewsbeherenComponent},
  {path: 'admin/skills', component: AdminskillsbeherenComponent},
  {path: 'admin/tags', component: AdmintagsbeherenComponent},
  {path: 'admin/types', component: AdmintypesbeherenComponent},

  //al de rest doorsturen naar home
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
