import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tirages } from './tirages';

@Injectable({
  providedIn: 'root'
})
export class TiragesService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public tousTirages(tontineId: number): Observable<Tirages[]>{
    return this.http.get<Tirages[]>(`${this.apiServerUrl}/historiqueTirage/tout/${tontineId}`);
  }

  public enregistrerTirage(tirage: Tirages): Observable<Tirages>{
    return this.http.post<Tirages>(`${this.apiServerUrl}/historiqueTirage/ajouter`,tirage);
  }
}
