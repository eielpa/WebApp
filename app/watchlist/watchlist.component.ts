import { Component } from '@angular/core';
import { WatchlistService } from '../../services/watchlist.service';
import { Movie } from '../../models/movie.model';

@Component({
    selector: 'app-watchlist',
    templateUrl: './watchlist.component.html',
    styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent {
    watchlist: Movie[] = [];

    constructor(private watchlistService: WatchlistService) {
        this.watchlist = this.watchlistService.getWatchlist();
    }

    removeMovie(movieId: number) {
        this.watchlistService.removeFromWatchlist(movieId);
        this.watchlist = this.watchlistService.getWatchlist();
    }
}
