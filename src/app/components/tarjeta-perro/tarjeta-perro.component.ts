import { Component, Input } from '@angular/core';
import {
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonBadge, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';
import { Perro } from '../../services/perros.service';

addIcons({ checkmarkCircle, closeCircle });

@Component({
  selector: 'app-tarjeta-perro',
  templateUrl: 'tarjeta-perro.component.html',
  styleUrls: ['tarjeta-perro.component.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonBadge, IonIcon],
})
export class TarjetaPerroComponent {
  // La tarjeta recibe el perro desde la página que la use.
  @Input() perro!: Perro;
}
