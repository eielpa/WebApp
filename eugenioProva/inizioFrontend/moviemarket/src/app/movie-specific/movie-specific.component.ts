import { Component } from '@angular/core';
import { ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-movie-specific',
  imports: [],
  templateUrl: './movie-specific.component.html',
  standalone: true,
  styleUrl: './movie-specific.component.css'
})

export class MovieSpecificComponent {
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
