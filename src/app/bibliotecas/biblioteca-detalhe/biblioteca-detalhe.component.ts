import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Biblioteca } from './../biblioteca.model';
import { BibliotecaService } from './../../biblioteca.service';
import { Livro } from '../livro.model';
@Component({
  selector: 'app-biblioteca-detalhe',
  templateUrl: './biblioteca-detalhe.component.html',
  styleUrls: ['./biblioteca-detalhe.component.scss'],
})
export class BibliotecaDetalheComponent implements OnInit {
  private slug: string;
  private _biblioteca: Biblioteca;
  catalogo: Livro[];

  get biblioteca() {
    return this._biblioteca;
  }

  set biblioteca(dadosBiblioteca: Biblioteca) {
    this._biblioteca = dadosBiblioteca;
  }

  constructor(
    private bibliotecaService: BibliotecaService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.carregarTela();
  }

  carregarTela() {
    this.route.params.subscribe((params) => {
      this.slug = params['slug'];
      this.carregarDadosBiblioteca(this.slug);
    });
  }

  private async carregarDadosBiblioteca(slug: string) {
    await this.bibliotecaService
      .buscarPorSlug(slug)
      .toPromise()
      .then((response) => (this.biblioteca = response))
      .catch((error) => {});

    this.carregarCatalogo(this.biblioteca.id);
  }

  private carregarCatalogo(idBiblioteca: string) {
    this.bibliotecaService.listarCatalogo(idBiblioteca).subscribe(
      (response) => {
        this.catalogo = response;
      },
      (error) => {},
    );
  }

  handleAlugar(evento: string) {
    const localStorageData = JSON.parse(
      localStorage.getItem('@ngx-books:biblioteca'),
    ) as { library: Biblioteca };

    const userData = localStorageData.library;

    const bookId = evento;
    const userId = userData.id;
    const libraryId = this.biblioteca.id;

    this.bibliotecaService
      .alugarLivro({
        bookId,
        userId,
        libraryId,
      })
      .subscribe(
        (response) => console.log(response),
        (error) => {},
      );
  }
}
