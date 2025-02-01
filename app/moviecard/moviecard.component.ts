import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-moviecard',
  templateUrl: './moviecard.component.html',
  standalone: true,
  styleUrls: ['./moviecard.component.css']
})
export class MovieCardComponent {
  @Input() movie: any;  // Input per il film

  constructor() {}
}