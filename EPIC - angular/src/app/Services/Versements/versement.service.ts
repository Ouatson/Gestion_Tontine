import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Versement } from './versement';

@Injectable({
  providedIn: 'root'
})
export class VersementService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public tousVersements(partId: number): Observable<Versement[]>{
    return this.http.get<Versement[]>(`${this.apiServerUrl}/versement/tous/${partId}`);
  }

  public ajoutVersement(versement: Versement): Observable<Versement>{
    return this.http.post<Versement>(`${this.apiServerUrl}/versement/ajouter`, versement);
  }

  public suppprimerVersement(versId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/versement/supprimer/${versId}`);
  }

  private _listeners = new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable();
  }
  filter(filterBy: string){
    this._listeners.next(filterBy);
  }
}
