import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  standalone: true,
  styleUrl: './movie.component.css'
})
export class MovieComponent {
  movieTitle: string = '';
  movieDescription: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.movieTitle = params.get('title') || 'Film non trovato';
    });

    this.movieDescription = history.state.description || 'Descrizione non disponibile';
  }
}
