import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from "../services/login.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-recupero-password',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf],  // Importa FormsModule per usare ngModel
  templateUrl: './passwordrecovery.component.html',
  styleUrls: ['./passwordrecovery.component.css']
})
export class RecuperoPasswordComponent {
  title = "Recupero della password";
  email: string = "";  // Variabile per salvare l'email
  newPassword: string = "";  // Variabile per la nuova password
  showPasswordField: boolean = false; // Controllo per mostrare il campo password

  constructor(private router: Router, private loginService: LoginService) {}

  submitRecoveryForm() {
    if (this.email) {
      this.loginService.getUserByEmail(this.email).subscribe({
        next: (user) => {
          this.showPasswordField = true;
        },
        error: () => {
          this.showPasswordField = false;
        }
      });
      // Qui puoi implementare la logica per inviare l'email al backend
    } else {
      alert("Inserisci un'email valida.");
    }
  }

  onSubmit() {
    if (this.newPassword) {
      this.loginService.updatePassword(this.email, this.newPassword).subscribe({
        next: (response) => {
          console.log("Password aggiornata con successo");
          // Puoi mostrare un messaggio di successo o reindirizzare
        },
        error: (err) => {
          console.error("Errore nell'aggiornamento della password", err);
        }
      });
    } else {
      alert("Inserisci una nuova password valida.");
    }
  }
}
