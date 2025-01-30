import { Component } from '@angular/core';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // Componente principale standalone
  imports: [HomePageComponent], // Importa il componente della homepage
  template: `<app-home-page></app-home-page>`,
  styles: []
})
export class AppComponent {
  title = 'MovieMarket-frontend';
}
