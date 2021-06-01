import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { Livro } from 'src/app/livros/livro.model';
import { AcaoLivro, LivrosService } from 'src/app/livros/livros.service';

@Component({
  selector: 'app-livro-detalhe',
  templateUrl: './livro-detalhe.component.html',
  styleUrls: ['./livro-detalhe.component.scss'],
})
export class LivroDetalheComponent implements OnInit {
  slug: string;
  livro: Livro;
  isFooterBiblioteca = false;

  constructor(
    private livrosService: LivrosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.carregarTela();
  }

  carregarTela() {
    this.activatedRoute.params.subscribe((params) => {
      this.slug = params['slug'];
      this.carregarDadosLivro();
    });
  }

  private carregarDadosLivro() {
    this.livrosService.buscarPorSlug(this.slug).subscribe((response) => {
      this.livro = response;
    });
  }

  onExcluir() {
    this.confirmacao();
    this.livrosService
      .remover(this.livro.id)
      .pipe(tap(() => this.livrosService.emitirAcao(AcaoLivro.Removido)))
      .subscribe(
        (response) => {
          this.router.navigate(['/bibliotecas', 'perfil']);
        },
        (error) => {},
      );
  }

  private confirmacao() {
    console.log('Deseja realmente excluir?');
  }
}
