import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { Livro } from 'src/app/livros/livro.model';
import { AcaoLivro, LivrosService } from 'src/app/livros/livros.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-livro-detalhe',
  templateUrl: './livro-detalhe.component.html',
  styleUrls: ['./livro-detalhe.component.scss'],
})
export class LivroDetalheComponent implements OnInit {
  slug: string;
  livro: Livro;
  isBibliotecaLogada = false;

  constructor(
    private livrosService: LivrosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.carregarTela();
  }

  carregarTela() {
    this.activatedRoute.params.subscribe((params) => {
      this.slug = params['slug'];
      this.carregarDadosLivro();
      const lib = this.authService.buscarDadosBiblioteca();
      this.isBibliotecaLogada = Boolean(lib);
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
          this.router.navigate(['..'], {
            relativeTo: this.activatedRoute,
          });
        },
        (error) => {},
      );
  }

  private confirmacao() {
    console.log('Deseja realmente excluir?');
  }

  onDevolverLivro() {
    console.log('Devolver livro');
    this.router.navigate(['..'], {
      relativeTo: this.activatedRoute,
    });
  }
}
