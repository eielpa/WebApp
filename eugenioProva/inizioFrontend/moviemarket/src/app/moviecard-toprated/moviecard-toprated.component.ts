import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-moviecard-toprated',
  templateUrl: './moviecard-toprated.component.html',
  styleUrls: ['./moviecard-toprated.component.css']
})
export class MovieCardTopRatedComponent {
  @Input() movie: any;  // Input per il film
  @Input() movieIndex: number = 1;  // Inizializza a 0 (o un altro valore di default)

  constructor() {}
}
