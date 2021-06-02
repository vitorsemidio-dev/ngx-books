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
  esconderBotaoCta = true;

  constructor(
    private livrosService: LivrosService,
    private bibliotecaService: BibliotecaService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.carregarTela();
    this.verificarTipoUsuarioLogado();
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
    const usuario = this.authService.buscarDadosUsuario();

    if (!usuario) {
      return;
    }

    this.bibliotecaService
      .alugarLivro({
        bookId: evento.id,
        userId: usuario.id,
      })
      .subscribe(
        (response) => {},
        (error) => {},
      );
  }

  private verificarTipoUsuarioLogado() {
    const usuario = this.authService.buscarDadosUsuario();
    this.esconderBotaoCta = usuario ? false : true;
  }
}
