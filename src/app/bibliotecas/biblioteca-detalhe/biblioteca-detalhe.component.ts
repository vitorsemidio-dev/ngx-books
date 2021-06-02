import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Biblioteca } from './../biblioteca.model';
import { BibliotecaService } from '../services/biblioteca.service';
import { Livro } from '../../livros/livro.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-biblioteca-detalhe',
  templateUrl: './biblioteca-detalhe.component.html',
  styleUrls: ['./biblioteca-detalhe.component.scss'],
})
export class BibliotecaDetalheComponent implements OnInit {
  private slug: string;
  private _biblioteca: Biblioteca;
  catalogo: Livro[];
  esconderBotaoCta = true;

  get biblioteca() {
    return this._biblioteca;
  }

  set biblioteca(dadosBiblioteca: Biblioteca) {
    this._biblioteca = dadosBiblioteca;
  }

  constructor(
    private bibliotecaService: BibliotecaService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.carregarTela();
    this.verificarTipoUsuarioLogado();
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
    const usuario = this.authService.buscarDadosUsuario();

    if (!usuario) {
      return;
    }

    const bookId = evento;
    const userId = usuario.id;

    this.bibliotecaService
      .alugarLivro({
        bookId,
        userId,
      })
      .subscribe(
        (response) => console.log(response),
        (error) => {},
      );
  }

  private verificarTipoUsuarioLogado() {
    const usuario = this.authService.buscarDadosUsuario();
    this.esconderBotaoCta = usuario ? false : true;
  }
}
