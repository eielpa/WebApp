import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private apiUrl = 'http://localhost:8080/movies';  // Assicurati che l'URL corrisponda al tuo backend

    constructor(private http: HttpClient) {}

    // Recupera tutti i film
    getAllMovies(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    // Recupera un film specifico per ID
    getMovieById(id: number): Observable<any> {
        const url = `${this.apiUrl}/${id}` ;
        return this.http.get<any>(url);
    }

    // Recupera i film per rating
    getMoviesByRating(rating: number): Observable<any[]> {
        return this.http.get<any[]>("http://localhost:8080/movies/rating/"+rating);
    }

    // Recupera i film per categoria (assicurati di passare l'ID della categoria)
    getMoviesByCategory(categoryId: number): Observable<any[]> {
        const url = `${this.apiUrl}/category/${categoryId}` ;
        return this.http.get<any[]>(url);
    }

    // Recupera i film più recenti
    getMostRecentMovies(limit: number): Observable<any[]> {
        return this.http.get<any[]>("http://localhost:8080/movies/recent/" + limit);
    }
}