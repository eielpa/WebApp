import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterLink} from '@angular/router';
import { NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink, CommonModule, NavbarComponent
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = "suca";
}
