import {Component, OnInit} from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { MovieService } from '../services/movie.service';
import { MovieCardComponent } from '../moviecard/moviecard.component';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-movieGenericCard',
  imports: [CommonModule, NgForOf, MovieCardComponent],
  templateUrl: './movies-generic.component.html',
  standalone: true,
  styleUrls: ['./movies-generic.component.css']
})
export class MoviesGenericComponent implements OnInit {
  categories: any[] = []; // Lista di generi
  moviesByGenre: { genre: string, movies: any[] }[] = []; // Mappa con film per genere

  constructor(
      private categoryService: CategoryService,
      private movieService: MovieService
  ) {}

  ngOnInit(): void {
    // Ottieni tutti i generi
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories.slice(0, 15); // Limita a 15 generi

      // Per ogni genere, carica i film corrispondenti
      this.categories.forEach((category) => {
        this.movieService.getMoviesByCategory(category.id).subscribe((movies) => {
          console.log('Film per la categoria', category.name, movies);
          this.moviesByGenre.push({ genre: category.name, movies: movies });
        });

      });
    });
  }

  scroll(genre: string, direction: string) {
    const movieList = document.querySelector(`.movies-row[data-genre="${genre}"]`);
    if (movieList) {
      const scrollAmount = 300; // Puoi modificare la distanza di scorrimento
      movieList.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  }

}
