import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    NgIf
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userInfo: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    // Esegui una richiesta HTTP al backend per ottenere informazioni sull'utente
    this.http.get('http://localhost:8080/api/userinfo').subscribe(
      (data) => {
        this.userInfo = data;
      },
      (error) => {
        console.error('Errore nel recupero delle informazioni utente', error);
      }
    );
  }
}
