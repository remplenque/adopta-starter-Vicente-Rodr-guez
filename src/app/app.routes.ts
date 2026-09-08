import { Routes } from '@angular/router';
import { sesionGuard } from './guards/sesion.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./pages/registro/registro.page').then((m) => m.RegistroPage),
  },
  {
    // Sin sesión abierta, el guard manda al login: la app parte ahí.
    path: '',
    canActivate: [sesionGuard],
    loadComponent: () =>
      import('./pages/galeria/galeria.page').then((m) => m.GaleriaPage),
  },
  {
    path: 'detalle/:id',
    canActivate: [sesionGuard],
    loadComponent: () =>
      import('./pages/detalle/detalle.page').then((m) => m.DetallePage),
  },
  {
    path: 'nuevo',
    canActivate: [sesionGuard],
    loadComponent: () =>
      import('./pages/nuevo/nuevo.page').then((m) => m.NuevoPage),
  },
  {
    // Reusa el mismo formulario de 'nuevo', pero cargando los datos del perro.
    path: 'editar/:id',
    canActivate: [sesionGuard],
    loadComponent: () =>
      import('./pages/nuevo/nuevo.page').then((m) => m.NuevoPage),
  },
];
