import { Component, OnInit } from '@angular/core';

import { Livro } from './livro.model';
import { LivrosService } from './livros.service';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.scss'],
})
export class LivrosComponent implements OnInit {
  listagemLivro: Livro[];

  constructor(private livrosService: LivrosService) {}

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
    console.log(evento);
  }
}
