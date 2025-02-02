import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importa FormsModule e CommonModule
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user = {
    id: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    password: ''
  };

  registrationMessage: string = ''; // Messaggio di feedback per l'utente

  constructor(private http: HttpClient) {}

  onSubmit() {
    const requestBody = {
      id: this.user.id,
      name: `${this.user.firstName} ${this.user.lastName}`, // Backend usa `name`
      dob: this.user.birthDate,
      email: this.user.email,
      password: this.user.password
    };

    this.http.post('http://localhost:8080/auth/register', requestBody, { responseType: 'text' })
        .subscribe({
          next: (response) => {
            if (response === 'USER_SAVED') {
              this.registrationMessage = 'Registrazione completata con successo!';
            } else {
              this.registrationMessage = `Errore: ${response}`;
            }
          },
          error: (error) => {
            this.registrationMessage = 'Errore durante la registrazione. Riprova.';
            console.error('Errore:', error);
          }
        });
  }
}
