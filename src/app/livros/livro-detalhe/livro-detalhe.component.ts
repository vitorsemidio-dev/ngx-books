import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { Livro } from 'src/app/livros/livro.model';
import { LivrosService } from 'src/app/livros/services/livros.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Biblioteca } from 'src/app/bibliotecas/biblioteca.model';
import { Usuario } from 'src/app/usuario/usuario.model';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { AlertaModalService } from 'src/app/shared/services/alerta-modal.service';

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
    private alertaModalService: AlertaModalService,
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
    const confirmacaoExclusao = this.confirmarExclusao();

    confirmacaoExclusao.pipe(take(1)).subscribe((confirmacao) => {
      if (confirmacao) {
        // this.excluirLivro()
        console.log('livro excluido com sucesso');
      }
    });
  }

  onDevolverLivro() {
    const confirmacaoDevolucao = this.confirmarDevolucao();

    confirmacaoDevolucao.pipe(take(1)).subscribe((confirmacao) => {
      if (confirmacao) {
        this.devolverLivro();
      }
    });
  }

  private confirmarExclusao() {
    return this.alertaModalService.mostrarAlertaConfirmacao(
      'Exclusão livro',
      'Deseja realmente excluir o livro?',
      'Sim, quero excluir',
      'Não',
    );
  }

  private confirmarDevolucao() {
    return this.alertaModalService.mostrarAlertaConfirmacao(
      'Devolução livro',
      'Deseja realmente devolver o livro?',
      'Sim, quero devolver',
      'Não',
    );
  }

  private devolverLivro() {
    this.usuarioService
      .devolverLivro({
        userId: this.autenticado.id,
        bookId: this.livro.id,
      })
      .subscribe(
        (response) => {
          this.alertaModalService.mostrarAlertaSucesso(
            'Livro devolvido com sucesso',
          );
          this.router.navigate(['..'], {
            relativeTo: this.activatedRoute,
          });
        },
        (error) => {},
      );
  }

  private excluirLivro() {
    this.livrosService.remover(this.livro.id).subscribe(
      (response) => {
        this.router.navigate(['..'], {
          relativeTo: this.activatedRoute,
        });
      },
      (error) => {},
    );
  }
}
