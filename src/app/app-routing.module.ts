import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelkomComponent} from './welkom/welkom.component';
import { OpdrachtenComponent } from './maker/opdrachten/opdrachten.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component: WelkomComponent },
  { path: 'signUp', component: WelkomComponent },
  { path: 'logIn', component: LoginComponent },
  // authenticatien toevoegen bij alle onderstaande!!!
  { path: 'maker/opdrachten', component: OpdrachtenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
