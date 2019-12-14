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
import { ForbiddenComponent } from './forbidden/forbidden.component';
import {SkillService} from './services/skill.service';
import {NeedAuthGuard} from './security/need-auth-guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AdminModule } from './admin/admin.module';
import {SelecteerLijstComponent} from './bedrijf/selecteer-lijst/selecteer-lijst.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    WelkomComponent,
    LoginComponent,
    RegistreerComponent,
    BlockCopyPasteCutDirective,
    ForbiddenComponent,
    SelecteerLijstComponent
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
    BrowserAnimationsModule,
    AdminModule
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
