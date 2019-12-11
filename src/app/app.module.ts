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

import {FormsModule} from '@angular/forms';
import { RegistreerComponent } from './registreer/registreer.component';
import { BlockCopyPasteCutDirective} from './helpers/block-copy-paste-cut.directive';

import {HTTP_INTERCEPTORS } from '@angular/common/http';
import {SecurityInterceptor} from './security/security.interceptor';
import {UserService} from './services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/adminoverzicht/adminoverzicht.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    WelkomComponent,
    LoginComponent,
    RegistreerComponent,
    AdminComponent,
    BlockCopyPasteCutDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MakerModule,
    BedrijfModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: SecurityInterceptor,
    multi: true,
  },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
