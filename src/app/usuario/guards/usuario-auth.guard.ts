import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { RotasUrlApp } from 'src/app/shared/rotas-url-app';
import { AlertaModalService } from 'src/app/shared/services/alerta-modal.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertaModalservice: AlertaModalService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    const usuarioLogado = this.authService.buscarDadosUsuario();

    if (!usuarioLogado) {
      this.router.navigate([RotasUrlApp.loginUsuario]);
      this.alertaModalservice.mostrarAlertaAviso(
        'Para acessar o seu perfil, faça o login primeiro',
      );
      return false;
    }
    return true;
  }
}
