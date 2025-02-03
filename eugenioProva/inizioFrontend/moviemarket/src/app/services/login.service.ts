import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<string> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
        const body = new URLSearchParams();
        body.set('email', email);
        body.set('password', password);

        return this.http.post("http://localhost:8080/auth/login", body.toString(), { headers, responseType: 'text' }).pipe(
            catchError((error) => {
                return throwError(() => new Error(error.message || "Errore di connessione"));
            })
        );
    }
}
