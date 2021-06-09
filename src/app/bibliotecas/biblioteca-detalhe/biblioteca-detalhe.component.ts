import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { Biblioteca } from 'src/app/bibliotecas/biblioteca.model';
import { BibliotecaService } from 'src/app/bibliotecas/services/biblioteca.service';
import { Livro } from 'src/app/livros/livro.model';
import { AlertaModalService } from 'src/app/shared/services/alerta-modal.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';

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
    private usuarioService: UsuarioService,
    private alertaModalService: AlertaModalService,
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

  private verificarTipoUsuarioLogado() {
    const usuario = this.authService.buscarDadosUsuario();
    this.esconderBotaoCta = usuario ? false : true;
  }

  onAlugar(evento: string) {
    const usuario = this.authService.buscarDadosUsuario();

    if (!usuario) {
      return;
    }

    const bookId = evento;
    const userId = usuario.id;

    const confirmacaoExclusao = this.confirmarAluguel();

    confirmacaoExclusao.pipe(take(1)).subscribe((confirmacao) => {
      if (confirmacao) {
        this.alugarLivro(userId, bookId);
      }
    });
  }

  private confirmarAluguel() {
    return this.alertaModalService.mostrarAlertaConfirmacao(
      'Aluguel livro',
      'Deseja realmente lugar o livro?',
      'Sim, quero alugar',
      'Não',
    );
  }

  private alugarLivro(userId: string, bookId: string) {
    this.usuarioService
      .alugarLivro({
        bookId,
        userId,
      })
      .subscribe(
        (response) => {
          this.alertaModalService.mostrarAlertaSucesso(
            'Livro alugado com sucesso',
          );
        },
        (error) => {},
      );
  }
}
