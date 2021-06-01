import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Livro } from 'src/app/livros/livro.model';
import { Biblioteca } from '../biblioteca.model';

@Component({
  selector: 'app-perfil-detalhe',
  templateUrl: './perfil-detalhe.component.html',
  styleUrls: ['./perfil-detalhe.component.scss'],
})
export class PerfilDetalheComponent implements OnInit {
  biblioteca: Biblioteca;
  catalogo: Livro[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.carregarTela();
  }

  carregarTela() {
    this.carregarDadosPerfil();
  }

  private carregarDadosPerfil() {
    const dadosPerfil = JSON.parse(
      localStorage.getItem('@ngx-books:biblioteca'),
    ) as {
      library: Biblioteca;
    };

    this.biblioteca = dadosPerfil.library;
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
