import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Demandes } from './demandes';

@Injectable({
  providedIn: 'root'
})
export class DemandesService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public demandesFaites(email: string): Observable<Demandes[]> {
    return this.http.get<Demandes[]>(`${this.apiServerUrl}/demandes/parmoi/${email}`);
  }

  public faireDemande(demande: Demandes): Observable<Demandes> {
    return this.http.post<Demandes>(`${this.apiServerUrl}/demandes/faire`, demande);
  }

  public modifDemande(demande: Demandes): Observable<Demandes> {
    return this.http.put<Demandes>(`${this.apiServerUrl}/demandes/modifier`, demande);
  }

  public supprimerDemande(demandeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/demandes/supprimer/${demandeId}`);
  }

  private _listeners = new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable();
  }
  filter(filterBy: string){
    this._listeners.next(filterBy);
  }
}