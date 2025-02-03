import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MovieService } from '../services/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-specific',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-specific.component.html',
  styleUrls: ['./movie-specific.component.css']
})
export class MovieSpecificComponent implements OnInit {
  movie: any = null;  // Contiene i dettagli del film
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const movieTitle = params.get('title');  // Assicurati che il parametro sia 'title'
      if (movieTitle) {
        this.loadMovieDetails(movieTitle);  // Passa il titolo come stringa
      } else {
        this.errorMessage = 'Film non trovato';
      }
    });
  }

  private loadMovieDetails(title: string) {  // Modifica il tipo del parametro in stringa
    this.movieService.getMovieByTitle(title).subscribe({
      next: (data) => this.movie = data,
      error: () => this.errorMessage = 'Errore nel caricamento del film'
    });
  }
}
