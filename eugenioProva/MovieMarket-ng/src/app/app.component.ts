import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './components/home/home.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HomeComponent],
  template: `<app-home></app-home>`,
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MovieMarket-ng';
}
