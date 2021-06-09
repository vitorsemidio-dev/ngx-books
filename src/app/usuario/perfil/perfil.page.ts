import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  livrosAlugados = [];
  subs: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
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
    this.carregarLivrosAlugados();
    this.verificarAcoes();
  }

  private carregarLivrosAlugados() {
    const usuario = this.authService.buscarDadosUsuario();

    if (!usuario) {
      return;
    }

    this.usuarioService.listarLivrosAlugados(usuario.id).subscribe(
      (response) => {
        this.livrosAlugados = response;
      },
      (error) => {},
    );
  }

  private verificarAcoes() {
    const subLivro = this.usuarioService.emissor.subscribe((acaoUsuario) => {
      console.log(`Acao Usuario: [${acaoUsuario}]`);
      this.carregarLivrosAlugados();
    });

    this.subs.add(subLivro);
  }
}
