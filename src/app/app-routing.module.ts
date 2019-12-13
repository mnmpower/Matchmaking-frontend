import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WelkomComponent} from './welkom/welkom.component';
import {LoginComponent} from './login/login.component';
import {RegistreerComponent} from './registreer/registreer.component';

import {MaakopdrachtComponent} from './bedrijf/maakopdracht/maakopdracht.component';
import {DashboardComponent as DashboardBedrijf} from './bedrijf/dashboard/dashboard.component';
import {TagsComponent as TagsBedrijf} from './bedrijf/tags/tags.component';
import {ReviewComponent as ReviewBedrijf} from './bedrijf/review/review.component';
import {ProfielComponent as ProfielBedrijf} from './bedrijf/profiel/profiel.component';

import {AdminComponent} from './admin/adminoverzicht/adminoverzicht.component';

import {DashboardComponent as DashboardMaker} from './maker/dashboard/dashboard.component';
import {SkillsComponent as TagsMaker} from './maker/skills/skills.component';
import {ReviewComponent as ReviewMaker} from './maker/review/review.component';
import {OpdrachtenComponent} from './maker/opdrachten/opdrachten.component';
import {ProfielComponent as ProfielMaker} from './maker/profiel/profiel.component';
import { AdminbedrijvenbeherenComponent } from './admin/adminbedrijvenbeheren/adminbedrijvenbeheren.component';
import { AdminmakersbeherenComponent } from './admin/adminmakersbeheren/adminmakersbeheren.component';
import { AdminopdrachtenbeherenComponent } from './admin/adminopdrachtenbeheren/adminopdrachtenbeheren.component';
import { AdminreviewsbeherenComponent } from './admin/adminreviewsbeheren/adminreviewsbeheren.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import {NeedAuthGuard} from './security/need-auth-guard';
import { OpdrachtComponent } from './maker/opdracht/opdracht.component';
import { BedrijfProfielComponent } from './maker/bedrijf-profiel/bedrijf-profiel.component';
import { MakerProfielComponent } from './bedrijf/maker-profiel/maker-profiel.component';


const routes: Routes = [
  {path: '', component: WelkomComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registreer', component: RegistreerComponent},
  {path: 'forbidden', component: ForbiddenComponent},

  // authenticatien toevoegen bij alle onderstaande!!!
  {path: 'maker/dashboard/:id', component: DashboardMaker, canActivate: [NeedAuthGuard] },
  {path: 'maker/opdrachten/:id', component: OpdrachtenComponent, canActivate: [NeedAuthGuard]},
  {path: 'maker/profiel/:id', component: ProfielMaker, canActivate: [NeedAuthGuard]},
  {path: 'maker/skills/:id', component: TagsMaker, canActivate: [NeedAuthGuard]},
  {path: 'maker/reviews/:id', component: ReviewMaker, canActivate: [NeedAuthGuard]},
  {path: 'maker/bedrijf/:bedrijfID', component: BedrijfProfielComponent},

  {path: 'maker/opdracht/:opdrachtID', component: OpdrachtComponent},

  {path: 'bedrijf/dashboard/:id', component: DashboardBedrijf, canActivate: [NeedAuthGuard]},
  {path: 'bedrijf/maakopdracht/:id', component: MaakopdrachtComponent, canActivate: [NeedAuthGuard]},
  {path: 'bedrijf/tags/:id', component: TagsBedrijf, canActivate: [NeedAuthGuard]},
  {path: 'bedrijf/reviews/:id', component: ReviewBedrijf, canActivate: [NeedAuthGuard]},
  {path: 'bedrijf/profiel/:id', component: ProfielBedrijf, canActivate: [NeedAuthGuard]},
  {path: 'bedrijf/maker/:makerID', component: MakerProfielComponent},

  {path: 'admin/overzicht/:id', component: AdminComponent, canActivate: [NeedAuthGuard]},
  {path: 'admin/bedrijven', component: AdminbedrijvenbeherenComponent},
  {path: 'admin/makers', component: AdminmakersbeherenComponent},
  {path: 'admin/opdrachten', component: AdminopdrachtenbeherenComponent},
  {path: 'admin/reviews', component: AdminreviewsbeherenComponent},

  // al de rest doorsturen naar home
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
