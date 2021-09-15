import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { UserService } from './Services/User/user.service';
import { TontineService } from './Services/Tontine/tontine.service';
import { ParticipantService } from './Services/Participants/participant.service';
import { DemandesService } from './Services/Demandes/demandes.service';
import { TiragesService } from './Services/Tirages/tirages.service';
import { VersementService } from './Services/Versements/versement.service';
import { SignalsService } from './Services/Problemes/Signals/signals.service';
import { ImpayesService } from './Services/Problemes/Impayes/impayes.service';
import { VolsService } from './Services/Problemes/Vols/vols.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    })
  ],
  providers: [
    UserService,
    TontineService,
    ParticipantService,
    DemandesService,
    VersementService,
    TiragesService,
    SignalsService,
    ImpayesService,
    VolsService,
    BsDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
