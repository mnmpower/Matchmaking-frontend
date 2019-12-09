import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WelkomComponent } from './welkom/welkom.component';
import { MakerModule } from './maker/maker.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelkomComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MakerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
