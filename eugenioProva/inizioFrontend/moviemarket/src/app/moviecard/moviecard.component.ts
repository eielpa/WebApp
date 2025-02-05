import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {NgIf} from "@angular/common";
import {TMDbService} from "../services/tmdb.service";

@Component({
  selector: 'app-moviecard',
  templateUrl: './moviecard.component.html',
  standalone: true,
  imports: [
    NgIf
  ],
  styleUrls: ['./moviecard.component.css']
})
export class MovieCardComponent {
  @Input() movie: any;  // Input per il film
  movieImage: string = '';

  constructor(private router: Router, private tmdbService: TMDbService) {}

  ngOnInit() {
    this.tmdbService.getMovieImage(this.movie.title).subscribe(imageUrl => {
      this.movieImage = imageUrl;
      const heroElement = document.querySelector('.hero') as HTMLElement;
      if (heroElement) {
        heroElement.style.backgroundImage = `url(${imageUrl})`;
      }
    });
  }



  goToMovieDetails() {
    // Usa l'ID del film per la navigazione, invece del titolo
    this.router.navigate(['/movie', this.movie.title], {
      state: { description: this.movie.description }
    });
  }
}
