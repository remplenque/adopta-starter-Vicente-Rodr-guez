import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput,
  IonButton, IonText, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { paw, logInOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

addIcons({ paw, logInOutline });

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [
    FormsModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonInput, IonButton, IonText, IonIcon,
  ],
})
export class LoginPage {
  private auth = inject(AuthService);
  private router = inject(Router);

  correo = signal('');
  clave = signal('');
  error = signal('');

  /** Credenciales de la cuenta fija, para mostrarlas y rellenarlas de un toque. */
  demo = AuthService.DEMO;

  usarDemo() {
    this.correo.set(this.demo.correo);
    this.clave.set(this.demo.clave);
    this.error.set('');
  }

  formularioValido = computed(
    () => this.correo().trim().length > 0 && this.clave().length > 0
  );

  entrar() {
    if (!this.formularioValido()) return;

    if (!this.auth.ingresar(this.correo(), this.clave())) {
      this.error.set('Correo o clave incorrectos.');
      return;
    }

    this.error.set('');
    this.router.navigate(['/']);
  }
}
