import { Component } from '@angular/core';
import { RegistrationService, User } from '../services/registration.service'; // Importa il servizio
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importa FormsModule e CommonModule
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user: User = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dob: ''
  };

  registrationMessage: string = ''; // Messaggio di feedback per l'utente

  constructor(private registrationService: RegistrationService, private router: Router) {} // Usa il RegistrationService

  onSubmit() {
    this.registrationService.registerUser(this.user).subscribe({
      next: (response) => {
        console.log(response);
        if (response.equals("USER_SAVED")) {
          alert('Registrazione completata con successo! Ora verrai reindirizzato alla pagina di login.');
          this.router.navigate(['/login']);
          this.registrationMessage = 'Registrazione completata con successo!';
        } else {
          this.registrationMessage = `Errore: ${response}`;
        }
      },
      error: (error) => {
        // Gestisce gli errori HTTP
        this.registrationMessage = 'Errore durante la registrazione. Riprova.';
        console.error('Errore:', error);
      }
    });
  }
}
