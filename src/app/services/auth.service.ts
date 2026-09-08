import { Injectable, computed, signal } from '@angular/core';

export interface Usuario {
  correo: string;
  clave: string;
}

/**
 * Sesión y usuarios de ejercicio: viven en memoria, se pierden al recargar y
 * la clave se guarda tal cual, sin cifrar.
 *
 * OJO: esto NO es un login de verdad. No sirve para proteger nada real, porque
 * todo ocurre en el navegador y cualquiera puede ver los datos. Es solo para
 * practicar pantallas, rutas y navegación.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  /** Cuenta fija de demostración: siempre está, aunque se recargue la página. */
  static readonly DEMO: Usuario = { correo: 'demo@adopta.cl', clave: '123456' };

  private usuarios = signal<Usuario[]>([
    // Los usuarios registrados se suman a esta lista, pero solo mientras dure
    // la sesión del navegador: al recargar, todo vuelve a quedar solo con demo.
    AuthService.DEMO,
  ]);

  /** Correo del usuario con la sesión abierta, o null si nadie entró. */
  private sesion = signal<string | null>(null);

  usuarioActual = computed(() => this.sesion());

  autenticado = computed(() => this.sesion() !== null);

  todos(): Usuario[] {
    return this.usuarios();
  }

  existe(correo: string): boolean {
    const buscado = correo.trim().toLowerCase();
    return this.usuarios().some((u) => u.correo === buscado);
  }

  /** Da de alta un usuario. Devuelve false si el correo ya estaba tomado. */
  registrar(correo: string, clave: string): boolean {
    const nuevo: Usuario = { correo: correo.trim().toLowerCase(), clave };
    if (this.existe(nuevo.correo)) return false;

    this.usuarios.update((lista) => [...lista, nuevo]);
    return true;
  }

  /** Abre la sesión si el correo y la clave coinciden con algún usuario. */
  ingresar(correo: string, clave: string): boolean {
    const buscado = correo.trim().toLowerCase();
    const usuario = this.usuarios().find(
      (u) => u.correo === buscado && u.clave === clave
    );
    if (!usuario) return false;

    this.sesion.set(usuario.correo);
    return true;
  }

  salir(): void {
    this.sesion.set(null);
  }
}
