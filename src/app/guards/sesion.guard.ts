import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * La puerta: sin sesión abierta no se entra a la galería (ni al resto).
 * Es una barrera de navegación, no de seguridad: los datos igual viven en el
 * navegador y no hay servidor que valide nada.
 */
export const sesionGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.autenticado()) return true;

  return router.createUrlTree(['/login']);
};
