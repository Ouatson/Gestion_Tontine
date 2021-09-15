import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tontine } from '../Tontine/tontine';
import { Participant } from './participant';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public rechercherParticipant(participantId: any): Observable<Participant>{
    return this.http.get<Participant>(`${this.apiServerUrl}/participants/rechercher/${participantId}`);
  }

  public ajouterParticipant(participant: Participant): Observable<Participant>{
    return this.http.post<Participant>(`${this.apiServerUrl}/participants/ajouter`, participant);
  }

  public modifierParticipant(participant: Participant): Observable<Participant>{
    return this.http.put<Participant>(`${this.apiServerUrl}/participants/modifier`, participant);
  }

  public mettreTontine(tontine: Tontine, participantId: number): Observable<Participant>{
    return this.http.put<Participant>(`${this.apiServerUrl}/participants/mettreTontine/${participantId}`, tontine);
  }

  public supprimerParticipant(participantId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/participants/supprimer/${participantId}`);
  }
}
