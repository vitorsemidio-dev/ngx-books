import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { BibliotecaService } from 'src/app/bibliotecas/services/biblioteca.service';
import { Livro } from 'src/app/livros/livro.model';
import { LivrosService } from 'src/app/livros/services/livros.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit, OnDestroy {
  private readonly subs: Subscription = new Subscription();

  catalogo: Livro[];

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
    this.carregarCatalogo();
    this.verificarAcoes();
  }

  private verificarAcoes() {
    const subLivro = this.livroService.emissor.subscribe((acaoLivro) => {
      console.log(`Acao Livro: [${acaoLivro}]`);
      this.carregarCatalogo();
    });

    const subBiblioteca = this.bibliotecaService.emissor.subscribe(
      (acaoBiblioteca) => {
        console.log(`Acao Biblioteca: [${acaoBiblioteca}]`);
        this.carregarCatalogo();
      },
    );

    this.subs.add(subLivro);
    this.subs.add(subBiblioteca);
  }

  private carregarCatalogo() {
    const biblioteca = this.authService.buscarDadosBiblioteca();

    if (!biblioteca) {
      return;
    }

    this.bibliotecaService.listarCatalogo(biblioteca.id).subscribe(
      (response) => (this.catalogo = response),
      (error) => {},
    );
  }
}
