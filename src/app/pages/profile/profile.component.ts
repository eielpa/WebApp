import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userName: string = 'John Doe';
  userEmail: string = 'john.doe@example.com';
  registrationDate: string = '2022-01-01';

  editProfile() {
    console.log('Modifica Profilo');
    // Aggiungi logica per modificare il profilo
  }
}
