import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { Livro } from 'src/app/livros/livro.model';
import {
  AcaoLivro,
  LivrosService,
} from 'src/app/livros/services/livros.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Biblioteca } from 'src/app/bibliotecas/biblioteca.model';
import { Usuario } from 'src/app/usuario/usuario.model';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';

@Component({
  selector: 'app-livro-detalhe',
  templateUrl: './livro-detalhe.component.html',
  styleUrls: ['./livro-detalhe.component.scss'],
})
export class LivroDetalheComponent implements OnInit {
  slug: string;
  livro: Livro;
  isBibliotecaLogada = false;
  autenticado: Biblioteca | Usuario;

  constructor(
    private livrosService: LivrosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit(): void {
    this.carregarInformacaoAutenticacao();
    this.carregarTela();
  }

  carregarTela() {
    this.activatedRoute.params.subscribe((params) => {
      this.slug = params['slug'];
      this.carregarDadosLivro(this.slug);
    });
  }

  private carregarInformacaoAutenticacao() {
    const { library, user } = this.authService.buscarDadosSessao();

    this.isBibliotecaLogada = Boolean(library);
    this.autenticado = library || user;
  }

  private carregarDadosLivro(slug: string) {
    this.livrosService.buscarPorSlug(slug).subscribe((response) => {
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
    this.devolverLivro();
  }

  private devolverLivro() {
    this.usuarioService
      .devolverLivro(this.autenticado.id, this.livro.id)
      .subscribe(
        (response) => {
          this.router.navigate(['..'], {
            relativeTo: this.activatedRoute,
          });
        },
        (error) => {},
      );
  }
}
