import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = 'http://localhost:8080'; // URL del tuo backend Spring Boot

  constructor(private http: HttpClient) {}

  // Metodo per la registrazione
  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/confirmRegistration`, user);
  }

  // Metodo per il login
  loginUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/doLogin`, { email, password });
  }
}
