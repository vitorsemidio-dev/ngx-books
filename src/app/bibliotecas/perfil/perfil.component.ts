import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { BibliotecaService } from 'src/app/bibliotecas/services/biblioteca.service';
import { Livro } from 'src/app/livros/livro.model';
import { LivrosService } from 'src/app/livros/livros.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Biblioteca } from '../biblioteca.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit, OnDestroy {
  biblioteca: Biblioteca;
  catalogo: Livro[];
  subs: Subscription = new Subscription();

  constructor(
    private bibliotecaService: BibliotecaService,
    private authService: AuthService,
    private livroService: LivrosService,
  ) {}

  ngOnInit(): void {
    this.carregarTela();
  }

  ngOnDestroy() {
    if (this.subs || !this.subs.closed) {
      this.subs.unsubscribe();
    }
  }

  carregarTela() {
    this.carregarDadosPerfil();
    this.carregarCatalogo();
    this.verificarAcoes();
  }

  private verificarAcoes() {
    const subLivro = this.livroService.acaoLivro.subscribe((acaoLivro) => {
      console.log(`Acao Livro: [${acaoLivro}]`);
      this.carregarCatalogo();
    });

    const subBiblioteca = this.bibliotecaService.acaoBiblioteca.subscribe(
      (acaoBiblioteca) => {
        console.log(`Acao Biblioteca: [${acaoBiblioteca}]`);
        this.carregarCatalogo();
      },
    );

    this.subs.add(subLivro);
    this.subs.add(subBiblioteca);
  }

  private carregarDadosPerfil() {
    const dadosSessao = this.authService.buscarDadosSessao();

    if (!dadosSessao) {
      return;
    }

    this.biblioteca = dadosSessao.library;
  }

  private carregarCatalogo() {
    this.bibliotecaService.listarCatalogo(this.biblioteca.id).subscribe(
      (response) => (this.catalogo = response),
      (error) => {},
    );
  }
}
