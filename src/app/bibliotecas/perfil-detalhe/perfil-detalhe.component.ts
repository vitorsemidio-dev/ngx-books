import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Livro } from 'src/app/livros/livro.model';
import { LoginService } from 'src/app/login/login.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Biblioteca } from '../biblioteca.model';

@Component({
  selector: 'app-perfil-detalhe',
  templateUrl: './perfil-detalhe.component.html',
  styleUrls: ['./perfil-detalhe.component.scss'],
})
export class PerfilDetalheComponent implements OnInit {
  biblioteca: Biblioteca;
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
    const biblioteca = this.authService.buscarDadosBiblioteca();

    if (!biblioteca) {
      return;
    }

    this.biblioteca = biblioteca;
  }

  onSair() {
    this.loginService.fazerLogout();
    this.redirecionarRota('/login');
  }

  private redirecionarRota(rota: string) {
    this.router.navigate([rota]);
  }
}
