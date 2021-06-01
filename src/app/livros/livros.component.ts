import { Component, OnInit } from '@angular/core';

import { BibliotecaService } from './../bibliotecas/services/biblioteca.service';
import { AuthService } from '../shared/services/auth.service';

import { Livro } from './livro.model';
import { LivrosService } from './livros.service';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.scss'],
})
export class LivrosComponent implements OnInit {
  listagemLivro: Livro[];

  constructor(
    private livrosService: LivrosService,
    private bibliotecaService: BibliotecaService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.carregarTela();
  }

  carregarTela() {
    this.livrosService.listar().subscribe(
      (response) => {
        this.listagemLivro = response;
      },
      (error) => {},
    );
  }

  handleAlugar(evento: Livro) {
    const dadosSessao = this.authService.buscarDadosSessao();

    if (!dadosSessao) {
      return;
    }

    const { user } = dadosSessao;

    this.bibliotecaService
      .alugarLivro({
        bookId: evento.id,
        libraryId: 'libraryId',
        userId: user.id,
      })
      .subscribe(
        (response) => {},
        (error) => {},
      );
  }
}
