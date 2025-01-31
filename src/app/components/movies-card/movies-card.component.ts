import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movies-card',
  standalone: true,
  templateUrl: './movies-card.component.html',
  styleUrls: ['./movies-card.component.css']
})
export class MoviesCardComponent {
  @Input() title!: string;
  @Input() director!: string;
  @Input() movieImage!: string;
  @Input() description!: string;
}
