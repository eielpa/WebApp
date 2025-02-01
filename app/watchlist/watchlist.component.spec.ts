import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WatchlistComponent } from './watchlist.component';
import { WatchlistService } from '../../services/watchlist.service';
import { By } from '@angular/platform-browser';

describe('WatchlistComponent', () => {
    let component: WatchlistComponent;
    let fixture: ComponentFixture<WatchlistComponent>;
    let watchlistService: WatchlistService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ WatchlistComponent ],
            providers: [ WatchlistService ]
        }).compileComponents();

        fixture = TestBed.createComponent(WatchlistComponent);
        component = fixture.componentInstance;
        watchlistService = TestBed.inject(WatchlistService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add movie to watchlist', () => {
        const movie = { id: 1, title: 'Inception', poster: '', year: 2010, rating: 8.8 };
        watchlistService.addToWatchlist(movie);
        expect(watchlistService.getWatchlist().length).toBe(1);
    });

    it('should remove movie from watchlist', () => {
        const movie = { id: 2, title: 'Interstellar', poster: '', year: 2014, rating: 9.0 };
        watchlistService.addToWatchlist(movie);
        watchlistService.removeFromWatchlist(2);
        expect(watchlistService.getWatchlist().length).toBe(0);
    });
});
