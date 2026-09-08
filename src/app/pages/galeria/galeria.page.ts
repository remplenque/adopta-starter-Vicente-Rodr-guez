import { Component, inject, computed, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSegmentButton, IonLabel, IonGrid, IonRow, IonCol, IonIcon , IonSegment, IonFab, IonFabButton, IonButton, IonButtons, IonNote } from '@ionic/angular/standalone';
import { PerrosService, Perro } from '../../services/perros.service';
import { addIcons } from 'ionicons';
import { add, searchOutline, logOutOutline } from 'ionicons/icons';
addIcons({ add, searchOutline, logOutOutline });
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TarjetaPerroComponent } from '../../components/tarjeta-perro/tarjeta-perro.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-galeria',
  templateUrl: 'galeria.page.html',
  styleUrls: ['galeria.page.scss'],
  standalone: true,
  imports: [FormsModule, IonHeader, IonToolbar, IonTitle, RouterLink, IonContent, IonSegmentButton, IonLabel, IonGrid, IonRow, IonCol, IonIcon, IonSegment, IonFab, IonFabButton, IonButton, IonButtons, IonNote, TarjetaPerroComponent],
})
export class GaleriaPage {

  filtro = signal('default');

  perros = inject(PerrosService);
  private auth = inject(AuthService);
  private router = inject(Router);

  /** Correo de quien tiene la sesión abierta, para mostrarlo en la cabecera. */
  correo = this.auth.usuarioActual;

  cantidadPerros = (computed(() => this.perrosFiltrados().length));

  perrosFiltrados = computed<Perro[]>(() => {
    const lista = this.perros.todas();

    switch (this.filtro()) {
      case 'disponibles':
        return lista.filter((p) => !p.adoptado);
      case 'adoptados':
        return lista.filter((p) => p.adoptado);
      default:
        return lista;
    }
  });

  /** Cierra la sesión y devuelve al login. */
  salir() {
    this.auth.salir();
    this.router.navigate(['/login']);
  }
}
