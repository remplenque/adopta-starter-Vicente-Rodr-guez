import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonContent,
  IonIcon, IonBadge, IonChip, IonLabel, IonCard, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonCol, AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  heart, heartOutline, checkmarkCircle, paw, resize, flash,
  homeOutline, searchOutline, createOutline, trashOutline,
} from 'ionicons/icons';
import { PerrosService } from '../../services/perros.service';

addIcons({
  heart, heartOutline, checkmarkCircle, paw, resize, flash, homeOutline,
  searchOutline, createOutline, trashOutline,
});

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
  private router = inject(Router);
  private alertas = inject(AlertController);

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

  /** Abre el mismo formulario de 'nuevo', pero con los datos ya cargados. */
  editar() {
    this.router.navigate(['/editar', this.id]);
  }

  /** Borra al perro, pero solo después de confirmarlo. */
  async eliminar() {
    const p = this.perro();
    if (!p) return;

    const alerta = await this.alertas.create({
      header: `¿Eliminar a ${p.nombre}?`,
      message: 'Esta acción no se puede deshacer.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.perros.eliminar(p.id);
            this.router.navigate(['/']);
          },
        },
      ],
    });

    await alerta.present();
  }
}
