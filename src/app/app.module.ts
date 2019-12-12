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
import { AdminbedrijvenbeherenComponent } from './admin/adminbedrijvenbeheren/adminbedrijvenbeheren.component';
import { AdminmakersbeherenComponent } from './admin/adminmakersbeheren/adminmakersbeheren.component';
import { AdminreviewsbeherenComponent } from './admin/adminreviewsbeheren/adminreviewsbeheren.component';
import { AdminopdrachtenbeherenComponent } from './admin/adminopdrachtenbeheren/adminopdrachtenbeheren.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import {SkillService} from './services/skill.service';
import {NeedAuthGuard} from './security/need-auth-guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    WelkomComponent,
    LoginComponent,
    RegistreerComponent,
    AdminComponent,
    AdminbedrijvenbeherenComponent,
    AdminmakersbeherenComponent,
    AdminreviewsbeherenComponent,
    AdminopdrachtenbeherenComponent,
    BlockCopyPasteCutDirective,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MakerModule,
    BedrijfModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatTooltipModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: SecurityInterceptor,
    multi: true,
  },
    NeedAuthGuard,
    UserService,
    SkillService,
    NavbarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
