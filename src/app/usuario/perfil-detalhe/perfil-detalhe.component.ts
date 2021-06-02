import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/login/login.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-perfil-detalhe',
  templateUrl: './perfil-detalhe.component.html',
  styleUrls: ['./perfil-detalhe.component.scss'],
})
export class PerfilDetalheComponent implements OnInit {
  usuario: Usuario;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.carregarTela();
  }

  carregarTela() {
    this.carregarDadosPerfil();
  }

  private carregarDadosPerfil() {
    const usuario = this.authService.buscarDadosUsuario();

    if (!usuario) {
      return;
    }

    this.usuario = usuario;
  }

  onSair() {
    this.loginService.fazerLogout();
    this.redirecionarRota('/login');
  }

  private redirecionarRota(rota: string) {
    this.router.navigate([rota]);
  }
}
