import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environment';
import {Router} from '@angular/router'; // Assicurati di avere la configurazione giusta

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; // URL del backend
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Metodo per login
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/doLogin, { email, password }`, { withCredentials: true });
  }

  // Metodo per registrazione
  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/confirmRegistration`, user);
  }

  // Metodo per ottenere il valore dell'utente attualmente loggato
  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  // Metodo per verificare se l'utente è loggato
  checkLoginStatus(sessionId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/checkisLogged?sessionId=${sessionId}`);
  }

  // Metodo per log out
  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['login']);
  }
}
