import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-moviecard',
  templateUrl: './moviecard.component.html',
  standalone: true,
  styleUrls: ['./moviecard.component.css']
})
export class MovieCardComponent {
  @Input() movie: any;  // Input per il film

  constructor(private router: Router) {
  }

  goToMovieDetails() {
    this.router.navigate(['/movie', this.movie.title]); // Passa il titolo come parametro nell'URL
  }
}