import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moviecard-large',
  templateUrl: './moviecard-large.component.html',
  standalone: true,
  styleUrls: ['./moviecard-large.component.css']
})
export class MovieCardLargeComponent {
  @Input() movie: any; // Input per il film

  constructor(private router: Router) {}

  goToMovieDetails() {
    this.router.navigate(['/movie', this.movie.title]); // Passa il titolo come parametro nell'URL
  }
}
