import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ClientRoutingModule } from './client-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { LeftmenuComponent } from './leftmenu/leftmenu.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSliderModule } from '@angular/material/slider';
import { NgApexchartsModule } from "ng-apexcharts";
import { SettingsComponent } from './settings/settings.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import timeGridPlugin from '@fullcalendar/timegrid';
import { TontineAccueilComponent } from './tontine-accueil/tontine-accueil.component';
import { MesTontinesComponent } from './mes-tontines/mes-tontines.component';
import { MesParticipationsComponent } from './mes-participations/mes-participations.component';
import { DemandesParticipationsComponent } from './demandes-participations/demandes-participations.component';
import { VersementComponent } from './versement/versement.component';
import { TiragesComponent } from './tirages/tirages.component';
import { SignalComponent } from './signal/signal.component';
import { VolsComponent } from './vols/vols.component';
import { ImpayesComponent } from './impayes/impayes.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CountToModule } from 'angular-count-to';
import { FooterComponent } from './footer/footer.component';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    CarouselModule.forRoot(),
    DragDropModule,
    MatSliderModule,
    NgApexchartsModule,
    NgMultiSelectDropDownModule.forRoot(),
    CountToModule,
    ToastrModule.forRoot({
    }),
    FullCalendarModule
  ],
  declarations: [
    ClientRoutingModule.components,
    HeaderComponent,
    LeftmenuComponent,
    SettingsComponent,
    TontineAccueilComponent,
    MesTontinesComponent,
    MesParticipationsComponent,
    DemandesParticipationsComponent,
    VersementComponent,
    TiragesComponent,
    SignalComponent,
    VolsComponent,
    ImpayesComponent,
    FooterComponent
  ],
  providers: [BsDatepickerModule]
})
export class ClientModule { }