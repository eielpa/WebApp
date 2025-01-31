import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/confirmRegistration'; // Cambia l'URL se necessario

  constructor(private http: HttpClient) {}

  register(user: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
