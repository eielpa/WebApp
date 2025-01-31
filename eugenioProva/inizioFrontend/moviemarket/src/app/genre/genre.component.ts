import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-genre',
  imports: [CommonModule],
  templateUrl: './genre.component.html',
  standalone: true,
  styleUrl: './genre.component.css'
})

export class GenreComponent {
  genreName: string = '';

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.genreName = params['name'];
    });
  }
}
