import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface WishlistItem {
    id: number;
    userId: string;
    movieId: number;
}

@Injectable({
    providedIn: 'root'
})
export class WishlistService {
    private baseUrl = 'http://localhost:8080/wishlist';

    constructor(private http: HttpClient) { }

    // Aggiunge un film alla wishlist usando il sessionId come userId
    addToWishlist(movieId: number): Observable<WishlistItem> {
        const userId = sessionStorage.getItem('sessionId');
        if (!userId) {
            throw new Error('Utente non autenticato.');
        }

        return this.http.post<WishlistItem>(`${this.baseUrl}/add?userId=${userId}&movieId=${movieId}`, {});
    }

    removeFromWishlist(id: number): Observable<string> {
        return this.http.delete<string>(`${this.baseUrl}/remove/${id}`);
    }

    getUserWishlist(): Observable<WishlistItem[]> {
        const userId = sessionStorage.getItem('userNickname');
        if (!userId) {
            throw new Error('Utente non autenticato.');
        }
        return this.http.get<WishlistItem[]>("http://localhost:8080/wishlist/user/" + userId);
    }

}