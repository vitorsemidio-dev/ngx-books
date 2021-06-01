import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Livro } from 'src/app/livros/livro.model';
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

  constructor(private router: Router, private authService: AuthService) {}

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

    this.biblioteca = dadosSessao.library;
  }

  onSair() {
    this.limparInformacaoUsuarioLogado();
    this.redirecionarRota('/login');
  }

  private limparInformacaoUsuarioLogado() {
    localStorage.removeItem('@ngx-books:biblioteca');
  }

  private redirecionarRota(rota: string) {
    this.router.navigate([rota]);
  }
}
