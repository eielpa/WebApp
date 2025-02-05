import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loadStripe } from "@stripe/stripe-js";

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

    getMoviesByTitle(title: string | null): Observable<any> {
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

    addMovie(movie: any): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post("http://localhost:8080/movies/addMovie", movie, { headers });
    }

    deleteMovie(id: number): Observable<void> {
        return this.http.delete<void>("http://localhost:8080/movies/" + id);
    }

    // Ricerca film per titolo (o altri criteri) in base a una query di ricerca
    searchMovies(query: string): Observable<any[]> {
        return this.http.get<any[]>("http://localhost:8080/movies/search?title=" + encodeURIComponent(query));
    }

    async checkout(movieName: string | null) {
        const stripe = await loadStripe('pk_test_51Qojg0FLbKZK8agR33P77Etv4O3BWAfcMCmNMrSgjM6Q7dHrj3DhmH6aoDaGPuCmBK6ZfiAjUFD7vlAfFEUrT2v400GcB9tAMV'); // Sostituisci con la tua chiave pubblica di Stripe
        const userId = sessionStorage.getItem('userNickname');

        this.http.post<{ checkoutUrl: string }>("http://localhost:8080/stripe/create-checkout-session", { productName: movieName, userNickname: userId })
            .subscribe(response => {
                if (response.checkoutUrl) {
                    window.location.href = response.checkoutUrl; // Reindirizza al pagamento
                }
            });
    }

    addToWishlist(userId: string, movieId: string): Observable<any> {
        const body = { userId, movieId };
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post("http://localhost:8080/wishlist/add", body, { headers });
    }

}