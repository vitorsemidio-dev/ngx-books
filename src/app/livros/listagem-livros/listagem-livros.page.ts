import { Component, OnInit } from '@angular/core';

import { BibliotecaService } from 'src/app/bibliotecas/services/biblioteca.service';
import { AuthService } from 'src/app/shared/services/auth.service';

import { Livro } from '../livro.model';
import { LivrosService } from '../services/livros.service';

@Component({
  selector: 'app-listagem-livros',
  templateUrl: './listagem-livros.page.html',
  styleUrls: ['./listagem-livros.page.scss'],
})
export class ListagemLivrosPage implements OnInit {
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
