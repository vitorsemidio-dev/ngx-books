import { Component, OnInit } from '@angular/core';

import { BibliotecaService } from './../bibliotecas/services/biblioteca.service';

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
    this.bibliotecaService
      .alugarLivro({
        bookId: evento.id,
        libraryId: 'libraryId',
        userId: 'userId',
      })
      .subscribe((result) => {
        console.log('[Response Alugar Livro]');
        console.table(result);
      });
  }
}
