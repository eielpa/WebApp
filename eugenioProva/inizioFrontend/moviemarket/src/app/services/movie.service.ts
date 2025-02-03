import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movie {
    id: number;
    title: string;
    description: string;
    releaseYear: number;
    categoryId: number;
    rating?: number;       // rating opzionale (può essere null)
    addedDate: string;     // Data in formato ISO (es. "2025-01-01T12:34:56")
}

@Injectable({
    providedIn: 'root'
})
export class MovieService {
     // Assicurati che l'URL corrisponda al tuo backend

    constructor(private http: HttpClient) {}

    // Recupera tutti i film
    getAllMovies(): Observable<any[]> {
        return this.http.get<any[]>("http://localhost:8080/movies");
    }

    // Recupera un film specifico per ID
    getMovieByTitle(title: string): Observable<any> {
        return this.http.get<any>("http://localhost:8080/movies/getMovieByTitle/" + title);
    }

    // Recupera i film per rating
    getMoviesByRating(rating: number): Observable<any[]> {
        return this.http.get<any[]>("http://localhost:8080/movies/rating/" + rating);
    }

    // Recupera i film per categoria (assicurati di passare l'ID della categoria)
    getMoviesByCategory(categoryId: number ): Observable<any[]> {
        return this.http.get<any[]>("http://localhost:8080/movies/category/" + categoryId);
    }

    // Recupera i film più recenti
    getMostRecentMovies(limit: number): Observable<any[]> {
        return this.http.get<any[]>("http://localhost:8080/movies/recent/" + limit);
    }
}