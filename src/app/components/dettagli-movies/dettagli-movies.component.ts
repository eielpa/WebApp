import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-dettagli-movie',
    standalone: true,
    templateUrl: './dettagli-movie.component.html',
    styleUrls: ['./dettagli-movie.component.css']
})
export class DettagliMoviesComponent {
    @Input() id!: number;
    @Input() title!: string;
    @Input() description!: string;
    @Input() release_year!: number;
    @Input() category_id!: number;
}
