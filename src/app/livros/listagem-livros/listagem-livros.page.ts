import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { Livro } from 'src/app/livros/livro.model';
import { LivrosService } from 'src/app/livros/services/livros.service';
import { AlertaModalService } from 'src/app/shared/services/alerta-modal.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';

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
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private alertaModalService: AlertaModalService,
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

    const confirmacaoAluguel = this.confirmarAluguel();

    confirmacaoAluguel.pipe(take(1)).subscribe((confirmacao) => {
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
