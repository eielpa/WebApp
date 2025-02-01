import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';

@Injectable({
    providedIn: 'root'
})
export class WatchlistService {
    private watchlist: Movie[] = [];

    getWatchlist(): Movie[] {
        return this.watchlist;
    }

    addToWatchlist(movie: Movie): void {
        if (!this.watchlist.find(m => m.id === movie.id)) {
            this.watchlist.push(movie);
        }
    }

    removeFromWatchlist(movieId: number): void {
        this.watchlist = this.watchlist.filter(m => m.id !== movieId);
    }
}
