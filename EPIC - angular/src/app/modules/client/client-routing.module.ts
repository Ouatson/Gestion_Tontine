import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { TontineAccueilComponent } from './tontine-accueil/tontine-accueil.component';
import { MesTontinesComponent } from './mes-tontines/mes-tontines.component';
import { MesParticipationsComponent } from './mes-participations/mes-participations.component';
import { ClientComponent } from './client.component';
import { DemandesParticipationsComponent } from './demandes-participations/demandes-participations.component';
import { VersementComponent } from './versement/versement.component';
import { TiragesComponent } from './tirages/tirages.component';
import { SignalComponent } from './signal/signal.component';
import { VolsComponent } from './vols/vols.component';
import { ImpayesComponent } from './impayes/impayes.component';


const routes: Routes = [
  {
    path: 'gt-accueil',
    component: TontineAccueilComponent,
    data: { title: 'Gestion des tontines' }
  },
  {
    path: 'gt-mes-tontines',
    component: MesTontinesComponent,
    data: { title: 'Gestion des tontines - Mes tontines' }
  },
  {
    path: 'gt-mes-participations',
    component: MesParticipationsComponent,
    data: { title: 'Gestion des tontines - Mes participations' }
  },
  {
    path: 'gt-demandes-participations',
    component: DemandesParticipationsComponent,
    data: { title: 'Gestion des tontines - Demandes' }
  },
  {
    path: 'gt-actions-versement',
    component: VersementComponent,
    data: { title: 'Gestion des tontines - Versement' }
  },
  {
    path: 'gt-actions-tirages',
    component: TiragesComponent,
    data: { title: 'Gestion des tontines - Tirage' }
  },
  {
    path: 'gt-gestion-signal',
    component: SignalComponent,
    data: { title: 'Gestion des tontines - Signal' }
  },
  {
    path: 'gt-gestion-vols',
    component: VolsComponent,
    data: { title: 'Gestion des tontines - Vols' }
  },
  {
    path: 'gt-gestion-impayes',
    component: ImpayesComponent,
    data: { title: 'Gestion des tontines - Impayés' }
  },
  {
    path: 'parametres',
    component: SettingsComponent,
    data: { title: 'Gestion des tontines - Paramètres' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {
  static components = [
    ClientComponent
  ];

}