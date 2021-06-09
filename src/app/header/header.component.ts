import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Biblioteca } from '../bibliotecas/biblioteca.model';
import { LoginService } from '../shared/services/login.service';
import { AuthService } from '../shared/services/auth.service';
import { Usuario } from '../usuario/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subs: Subscription;
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
    if (this.subs || !this.subs.closed) {
      this.subs.unsubscribe();
    }
  }

  private verificacarLogin() {
    this.subs = this.loginService.emissor.subscribe((acao) => {
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
