import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonContent,
  IonIcon, IonBadge, IonChip, IonLabel, IonCard, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonCol,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  heart, heartOutline, checkmarkCircle, paw, resize, flash,
  homeOutline, searchOutline,
} from 'ionicons/icons';
import { PerrosService } from '../../services/perros.service';

addIcons({ heart, heartOutline, checkmarkCircle, paw, resize, flash, homeOutline, searchOutline });

@Component({
  selector: 'app-detalle',
  templateUrl: 'detalle.page.html',
  styleUrls: ['detalle.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonContent,
    IonIcon, IonBadge, IonChip, IonLabel, IonCard, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonCol,
  ],
})
export class DetallePage {
  private ruta = inject(ActivatedRoute);
  private perros = inject(PerrosService);

  /** id que viene en la URL: /detalle/4 */
  id = this.ruta.snapshot.paramMap.get('id') ?? '';

  perro = computed(() => this.perros.obtener(this.id));

  favorito = signal(false);

  alternarFavorito() {
    this.favorito.update((v) => !v);
  }

  /** Adopta al perro, o revierte la adopción si ya tenía familia. */
  alternarAdopcion() {
    const p = this.perro();
    if (p) {
      this.perros.alternarAdopcion(p.id);
    }
  }
}
