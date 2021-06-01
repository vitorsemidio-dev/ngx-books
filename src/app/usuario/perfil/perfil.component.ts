import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Biblioteca } from 'src/app/bibliotecas/biblioteca.model';

import { Livro } from 'src/app/livros/livro.model';
import { LoginService } from 'src/app/login/login.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  usuario: any;
  catalogo: Livro[];

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
    const dadosSessao = this.authService.buscarDadosSessao();

    if (!dadosSessao) {
      return;
    }

    this.usuario = dadosSessao.user;
  }

  onSair() {
    this.loginService.fazerLogout();
    this.redirecionarRota('/login');
  }

  private redirecionarRota(rota: string) {
    this.router.navigate([rota]);
  }
}
