import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WelkomComponent} from './welkom/welkom.component';
import {LoginComponent} from './login/login.component';

import {MaakopdrachtComponent} from './bedrijf/maakopdracht/maakopdracht.component';
import {RegistreerComponent} from './registreer/registreer.component';
import {AdminComponent} from './admin/admin-overzicht/admin-overzicht.component';

import {DashboardComponent} from './maker/dashboard/dashboard.component';
import {ProfielComponent} from './maker/profiel/profiel.component';
import {TagsComponent} from './maker/tags/tags.component';
import {ReviewComponent} from './maker/review/review.component';
import {OpdrachtenComponent} from './maker/opdrachten/opdrachten.component';


const routes: Routes = [
  {path: '', component: WelkomComponent},
  {path: 'logIn', component: LoginComponent},
  {path: 'registreer', component: RegistreerComponent},

  // authenticatien toevoegen bij alle onderstaande!!!
  {path: 'maker/dashboard', component: DashboardComponent},
  {path: 'maker/opdrachten', component: OpdrachtenComponent},
  {path: 'maker/profiel', component: ProfielComponent},
  {path: 'maker/tags', component: TagsComponent},
  {path: 'maker/reviews', component: ReviewComponent},

  {path: 'bedrijf/maakOpdracht', component: MaakopdrachtComponent},

  {path: 'admin/overzicht', component: AdminComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
