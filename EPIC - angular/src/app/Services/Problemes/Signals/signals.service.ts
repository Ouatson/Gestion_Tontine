import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Signals } from './signals';

@Injectable({
  providedIn: 'root'
})
export class SignalsService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public listerTout(userId: number): Observable<Signals[]>{
    return this.http.get<Signals[]>(`${this.apiServerUrl}/signal/afficherTout/${userId}`);
  }

  public ajoutSignal(signal: Signals): Observable<Signals>{
    return this.http.post<Signals>(`${this.apiServerUrl}/signal/nouveau`, signal);
  }

  public modifSignal(signal: Signals): Observable<Signals>{
    return this.http.put<Signals>(`${this.apiServerUrl}/signal/modifier`, signal);
  }

  public supSignal(signalId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/signal/supprimer/${signalId}`);
  }

  private _listeners = new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable();
  }
  filter(filterBy: string){
    this._listeners.next(filterBy);
  }
}