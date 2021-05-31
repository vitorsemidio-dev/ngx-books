import { Component, OnInit } from '@angular/core';

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

  constructor() {}

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
}
