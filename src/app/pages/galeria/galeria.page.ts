import { Component, inject, computed, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSegmentButton, IonLabel, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonBadge,IonIcon , IonSegment, IonFab, IonCardTitle,IonFabButton, IonCardSubtitle, IonButton } from '@ionic/angular/standalone';
import { PerrosService, Perro } from '../../services/perros.service';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
addIcons({ add });
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';   

@Component({
  selector: 'app-galeria',
  templateUrl: 'galeria.page.html',
  styleUrls: ['galeria.page.scss'],
  standalone: true,
  imports: [FormsModule, IonHeader, IonToolbar, IonTitle, RouterLink, IonContent, IonSegmentButton, IonLabel, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonFabButton, IonBadge,IonIcon, IonSegment, IonFab, IonButton],
})
export class GaleriaPage {

  filtro = signal('default');

  perros = inject(PerrosService);

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

  


  
  
}
