import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tontine } from '../Tontine/tontine';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public connexion(user: User): Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/connexion`, user);
  }

  public enregistrer(user: User): Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/enregistrer`, user);
  }

  public modifier(user: User): Observable<any>{
    return this.http.put<any>(`${this.apiServerUrl}/modifier`, user);
  }

  public mesTontines(userId: number): Observable<Tontine[]>{
    return this.http.get<Tontine[]>(`${this.apiServerUrl}/mestontines/${userId}`);
  }

  public rechercheUser(userId: any): Observable<User>{
    return this.http.get<User>(`${this.apiServerUrl}/userI/${userId}`);
  }

  public rechercheUserByEmail(userEmail: string): Observable<User>{
    return this.http.get<User>(`${this.apiServerUrl}/userE/${userEmail}`);
  }

  public supprimer(userId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/supprimer/${userId}`);
  }

  private _listeners = new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable();
  }
  filter(filterBy: string){
    this._listeners.next(filterBy);
  }
}
