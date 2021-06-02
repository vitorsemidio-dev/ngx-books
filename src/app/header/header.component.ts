import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Biblioteca } from '../bibliotecas/biblioteca.model';
import { LoginService } from '../bibliotecas/login/login.service';
import { AuthService } from '../shared/services/auth.service';
import { Usuario } from '../usuario/usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private acaoLogin$: Subscription;
  usuarioLogado: Biblioteca | Usuario;
  rotaPerfil: string;

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
    const sessao = this.authService.buscarDadosSessao();

    if (!sessao) {
      this.rotaPerfil = '';
      this.usuarioLogado = null;
      return;
    }

    const { library, user } = sessao;

    this.usuarioLogado = library || user;

    this.rotaPerfil = library ? '/bibliotecas/perfil' : '/usuarios/perfil';
  }
}
