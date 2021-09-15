import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Impayes } from './impayes';

@Injectable({
  providedIn: 'root'
})
export class ImpayesService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public listerTout(userId: number): Observable<Impayes[]>{
    return this.http.get<Impayes[]>(`${this.apiServerUrl}/impayes/afficherTout/${userId}`);
  }

  public ajoutImpaye(impaye: Impayes): Observable<Impayes>{
    return this.http.post<Impayes>(`${this.apiServerUrl}/impayes/nouveau`, impaye);
  }

  public modifImpaye(impaye: Impayes): Observable<Impayes>{
    return this.http.put<Impayes>(`${this.apiServerUrl}/impayes/modifier`, impaye);
  }

  public supImpaye(impayeId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/impayes/supprimer/${impayeId}`);
  }

  private _listeners = new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable();
  }
  filter(filterBy: string){
    this._listeners.next(filterBy);
  }
}