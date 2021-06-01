import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Biblioteca } from '../bibliotecas/biblioteca.model';
import { LoginService } from '../login/login.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  usuarioLogado: Biblioteca;
  private acaoLogin$: Subscription;

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.carregarDadosUsuarioAutenticado();
    this.verificacarLogin();
  }

  ngOnDestroy() {
    if (this.acaoLogin$ || !this.acaoLogin$.closed) {
      this.acaoLogin$.unsubscribe();
    }
  }

  private verificacarLogin() {
    this.acaoLogin$ = this.loginService.acaoLogin$.subscribe((acao) => {
      this.carregarDadosUsuarioAutenticado();
    });
  }

  carregarDadosUsuarioAutenticado() {
    const dadosSessao = this.authService.buscarDadosSessao();

    if (!dadosSessao) {
      this.usuarioLogado = null;
      return;
    }

    const { library, user } = dadosSessao;

    this.usuarioLogado = library || user;
  }
}
