import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WelkomComponent} from './welkom/welkom.component';
import {LoginComponent} from './login/login.component';
import {RegistreerComponent} from './registreer/registreer.component';

import {MaakopdrachtComponent} from './bedrijf/maakopdracht/maakopdracht.component';
import {DashboardComponent as DashboardBedrijf} from './bedrijf/dashboard/dashboard.component';
import {TagsComponent as TagsBedrijf} from './bedrijf/tags/tags.component';
import {ReviewComponent as ReviewBedrijf} from './maker/review/review.component';

import {AdminComponent} from './admin/admin-overzicht/admin-overzicht.component';

import {DashboardComponent as DashboardMaker} from './maker/dashboard/dashboard.component';
import {ProfielComponent} from './maker/profiel/profiel.component';
import {TagsComponent as TagsMaker} from './maker/tags/tags.component';
import {ReviewComponent as ReviewMaker} from './maker/review/review.component';
import {OpdrachtenComponent} from './maker/opdrachten/opdrachten.component';


const routes: Routes = [
  {path: '', component: WelkomComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registreer', component: RegistreerComponent},

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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
