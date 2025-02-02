import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Aggiungi FormsModule

@Component({
  selector: 'app-registration',
  imports: [FormsModule], // Importa FormsModule
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  // Oggetto che contiene i dati dell'utente
  user = {
    id: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    password: ''
  };

  onSubmit() {
    // Puoi implementare la logica per inviare i dati a un servizio o un'API
    console.log('Dati registrazione:', this.user);
  }
}
