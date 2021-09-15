import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../User/user';
import { Tontine } from './tontine';

@Injectable({
  providedIn: 'root'
})
export class TontineService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public touteTontines(userId: number): Observable<Tontine[]>{
    return this.http.get<Tontine[]>(`${this.apiServerUrl}/tontines/toutes/${userId}`);
  }

  public ajouterTontine(tontine: Tontine): Observable<Tontine>{
    return this.http.post<Tontine>(`${this.apiServerUrl}/tontines/ajouter`, tontine);
  }

  public modifierTontine(tontine: Tontine): Observable<Tontine>{
    return this.http.put<Tontine>(`${this.apiServerUrl}/tontines/modifier`, tontine);
  }

  public mettreProprio(user: User, tontineId: number): Observable<Tontine>{
    return this.http.put<Tontine>(`${this.apiServerUrl}/tontines/mettreProprio/${tontineId}`, user);
  }

  public rechercheTontine(tontineId: any): Observable<Tontine>{
    return this.http.get<Tontine>(`${this.apiServerUrl}/tontines/recherche/${tontineId}`);
  }

  public rechercheTontineByCode(tontineCode: string): Observable<Tontine>{
    return this.http.get<Tontine>(`${this.apiServerUrl}/tontines/rechercheCode/${tontineCode}`);
  }

  public supprimerTontine(tontineId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/tontines/supprimer/${tontineId}`);
  }

  private _listeners = new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable();
  }
  filter(filterBy: string){
    this._listeners.next(filterBy);
  }
}