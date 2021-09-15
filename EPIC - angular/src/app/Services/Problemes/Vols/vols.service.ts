import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vols } from './vols';

@Injectable({
  providedIn: 'root'
})
export class VolsService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public listerVol(userId: number): Observable<Vols[]>{
    return this.http.get<Vols[]>(`${this.apiServerUrl}/vols/afficherTout/${userId}`);
  }

  public ajoutVol(vol: Vols): Observable<Vols>{
    return this.http.post<Vols>(`${this.apiServerUrl}/vols/nouveau`, vol);
  }

  public modifVol(vol: Vols): Observable<Vols>{
    return this.http.put<Vols>(`${this.apiServerUrl}/vols/modifier`, vol);
  }

  public supVol(volId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/vols/supprimer/${volId}`);
  }

  private _listeners = new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable();
  }
  filter(filterBy: string){
    this._listeners.next(filterBy);
  }
}