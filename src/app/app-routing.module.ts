import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelkomComponent} from './welkom/welkom.component';
import { OpdrachtenComponent } from './maker/opdrachten/opdrachten.component';
import { LoginComponent } from './login/login.component';

import { MaakopdrachtComponent} from './bedrijf/maakopdracht/maakopdracht.component';
import {RegistreerComponent} from './registreer/registreer.component';


const routes: Routes = [
  { path: '', component: WelkomComponent },
  { path: 'logIn', component: LoginComponent },
  { path: 'registreer', component: RegistreerComponent },
  { path: 'bedrijf/maakOpdracht', component: MaakopdrachtComponent },

  // authenticatien toevoegen bij alle onderstaande!!!
  { path: 'maker/opdrachten', component: OpdrachtenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
