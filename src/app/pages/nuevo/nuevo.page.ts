import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent,
  IonSegment, IonSegmentButton, IonLabel, IonList, IonItem, IonInput,
  IonTextarea, IonToggle, IonButton,
} from '@ionic/angular/standalone';
import { PerrosService } from '../../services/perros.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: 'nuevo.page.html',
  styleUrls: ['nuevo.page.scss'],
  standalone: true,
  imports: [
    FormsModule, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonContent, IonSegment, IonSegmentButton, IonLabel, IonList, IonItem,
    IonInput, IonTextarea, IonToggle, IonButton,
  ],
})
export class NuevoPage {
  private perros = inject(PerrosService);
  private router = inject(Router);

  // Un signal por campo del formulario; el template los enlaza con [(ngModel)].
  tipo = signal('Perro');
  nombre = signal('');
  raza = signal('');
  edad = signal('');
  sexo = signal('');
  tamano = signal('');
  vacunada = signal(false);
  descripcion = signal('');
  foto = signal('');

  /** Lo mínimo para dar de alta: que tenga nombre. */
  formularioValido = computed(() => this.nombre().trim().length > 0);

  guardar() {
    if (!this.formularioValido()) return;

    this.perros.agregar({
      id: this.perros.proximoId(),
      nombre: this.nombre().trim(),
      tipo: this.tipo(),
      raza: this.raza().trim() || 'Sin especificar',
      edad: this.edad().trim(),
      sexo: this.sexo().trim() || 'Sin especificar',
      tamano: this.tamano().trim() || 'Sin especificar',
      vacunada: this.vacunada(),
      descripcion: this.descripcion().trim(),
      foto: this.foto().trim() || 'https://placedog.net/600/600?random',
      adoptado: false,
    });

    this.router.navigate(['/']);
  }
}
