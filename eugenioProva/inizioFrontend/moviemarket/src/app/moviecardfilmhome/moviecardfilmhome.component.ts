import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-moviecardfilmhome',
  templateUrl: './moviecardfilmhome.component.html',
  standalone: true,
  styleUrls: ['./moviecardfilmhome.component.css']
})
export class MoviecardfilmhomeComponent {
  @Input() movie: any;  // Input per il film

  constructor(private router: Router) {
  }

  goToMovieDetails() {
    this.router.navigate(['/movie', this.movie.title]); // Passa il titolo come parametro nell'URL
  }
}