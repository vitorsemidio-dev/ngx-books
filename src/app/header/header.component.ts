import { Component, OnInit } from '@angular/core';

import { Biblioteca } from '../bibliotecas/biblioteca.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  usuarioLogado: Biblioteca;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.carregarDadosUsuarioAutenticado();
  }

  carregarDadosUsuarioAutenticado() {
    const dadosSessao = this.authService.buscarDadosSessao();

    if (!dadosSessao) {
      return;
    }

    const { library } = dadosSessao;

    this.usuarioLogado = library;
  }
}
