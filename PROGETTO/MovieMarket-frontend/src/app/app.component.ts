import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './registration/registration.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,  // Marca il componente come standalone
  imports: [CommonModule, RouterOutlet, RegisterComponent], // Importa i moduli necessari, compreso RegisterComponent
  template: `<app-register></app-register>`, // Usa il componente RegisterComponent
  styles: []
})
export class AppComponent {
  title = 'MovieMarket-frontend';
}
