import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { WelkomComponent } from './welkom/welkom.component';
import { MakerModule } from './maker/maker.module';
import { LoginComponent } from './login/login.component';
import { BedrijfModule} from './bedrijf/bedrijf.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaakopdrachtComponent} from './bedrijf/maakopdracht/maakopdracht.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    WelkomComponent,
    LoginComponent,
    MaakopdrachtComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MakerModule,
    BedrijfModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
