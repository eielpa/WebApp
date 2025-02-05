import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from "../services/movie.service";
import { CommonModule } from "@angular/common";
import { MovieCardComponent } from "../moviecard/moviecard.component";
import { TMDbService } from "../services/tmdb.service";

@Component({
  selector: 'app-movie-specific',
  templateUrl: './movie-specific.component.html',
  standalone: true,
  styleUrls: ['./movie-specific.component.css'],
  imports: [CommonModule, MovieCardComponent]
})
export class MovieSpecificComponent {
  movieTitle: string | null = '';
  movieDescription: string = '';
  movieImage: string = ''; // 🔹 Aggiunto per l'immagine
  categoryMovieId: number | null | undefined;
  relatedMovies: any[] = [];
  userId: string | null = null;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private tmdbService: TMDbService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.movieTitle = params.get('title');
      this.userId=sessionStorage.getItem('userNickname');

      if (this.movieTitle) {
        this.tmdbService.getMovieImage(this.movieTitle).subscribe(imageUrl => {
          this.movieImage = imageUrl;
          const heroElement = document.querySelector('.hero') as HTMLElement;
          if (heroElement) {
            heroElement.style.backgroundImage = `url(${imageUrl})`;
          }
        });

        this.movieService.getMoviesByTitle(this.movieTitle).subscribe(movie => {
          if (movie) {
            this.categoryMovieId = movie.categoryId;
            if (this.categoryMovieId !== null && this.categoryMovieId !== undefined) {
              this.getRelatedMovies(this.categoryMovieId);
            }
          }
        });
      }
    });

    this.movieDescription = history.state.description || 'Descrizione non disponibile';
  }


  getRelatedMovies(categoryId: number) {
    this.movieService.getMoviesByCategory(categoryId).subscribe(movies => {
      this.relatedMovies = movies.filter(m => m.title !== this.movieTitle);
    });
  }

  scroll(list: HTMLElement, direction: string) {
    const scrollAmount = 300;
    if (direction === 'left') {
      list.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      list.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  addToWishlist() {
    if (!this.movieTitle || !this.userId) return;

    this.movieService.addToWishlist(this.userId, this.movieTitle).subscribe({
      next: () => console.log('Film aggiunto alla wishlist'),
      error: () => console.error('Errore nell\'aggiunta alla wishlist')
    });
  }

  pay(movieTitle: string | null) {
    this.movieService.checkout(movieTitle);
  }
}
