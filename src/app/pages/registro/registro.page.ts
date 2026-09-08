import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent,
  IonList, IonItem, IonInput, IonButton, IonText, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personAddOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

addIcons({ personAddOutline });

@Component({
  selector: 'app-registro',
  templateUrl: 'registro.page.html',
  styleUrls: ['registro.page.scss'],
  standalone: true,
  imports: [
    FormsModule, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonContent, IonList, IonItem, IonInput, IonButton, IonText, IonIcon,
  ],
})
export class RegistroPage {
  private auth = inject(AuthService);
  private router = inject(Router);

  correo = signal('');
  clave = signal('');
  repetirClave = signal('');
  error = signal('');

  formularioValido = computed(
    () =>
      this.correo().trim().includes('@') &&
      this.clave().length >= 4 &&
      this.clave() === this.repetirClave()
  );

  registrar() {
    if (!this.formularioValido()) return;

    if (!this.auth.registrar(this.correo(), this.clave())) {
      this.error.set('Ese correo ya está registrado.');
      return;
    }

    this.error.set('');
    // Queda creado; ahora entra por el login con esas credenciales.
    this.router.navigate(['/login']);
  }
}
