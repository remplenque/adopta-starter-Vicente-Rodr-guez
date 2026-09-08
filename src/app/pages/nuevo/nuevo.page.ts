import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  private ruta = inject(ActivatedRoute);

  /** Si la ruta trae id (/editar/4) el formulario edita en vez de crear. */
  id = this.ruta.snapshot.paramMap.get('id');
  editando = this.id !== null;

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

  /** Datos que no se editan en el formulario pero hay que conservar. */
  private adoptado = false;
  private caracter?: string;

  constructor() {
    if (this.editando) {
      const p = this.perros.obtener(this.id!);
      if (p) {
        this.tipo.set(p.tipo);
        this.nombre.set(p.nombre);
        this.raza.set(p.raza);
        this.edad.set(p.edad);
        this.sexo.set(p.sexo);
        this.tamano.set(p.tamano);
        this.vacunada.set(p.vacunada);
        this.descripcion.set(p.descripcion);
        this.foto.set(p.foto);
        this.adoptado = p.adoptado;
        this.caracter = p.caracter;
      }
    }
  }

  /** Lo mínimo para dar de alta: que tenga nombre. */
  formularioValido = computed(() => this.nombre().trim().length > 0);

  guardar() {
    if (!this.formularioValido()) return;

    const datos = {
      id: this.editando ? Number(this.id) : this.perros.proximoId(),
      nombre: this.nombre().trim(),
      tipo: this.tipo(),
      raza: this.raza().trim() || 'Sin especificar',
      edad: this.edad().trim(),
      sexo: this.sexo().trim() || 'Sin especificar',
      tamano: this.tamano().trim() || 'Sin especificar',
      vacunada: this.vacunada(),
      descripcion: this.descripcion().trim(),
      foto: this.foto().trim() || 'https://placedog.net/600/600?random',
      adoptado: this.adoptado,
      caracter: this.caracter,
    };

    if (this.editando) {
      this.perros.editar(datos);
      this.router.navigate(['/detalle', datos.id]);
      return;
    }

    this.perros.agregar(datos);
    this.router.navigate(['/']);
  }
}
