import { Component, OnInit } from '@angular/core';

import { Chave } from 'src/app/shared/chave';
import { Biblioteca } from '../bibliotecas/biblioteca.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  usuarioLogado: Biblioteca;

  constructor() {}

  ngOnInit(): void {
    this.carregarDadosUsuarioAutenticado();
  }

  carregarDadosUsuarioAutenticado() {
    const dadosLocalStorage = localStorage.getItem(Chave.chaveUsuarioLogado);

    if (!dadosLocalStorage) {
      return;
    }

    const { library } = JSON.parse(dadosLocalStorage) as {
      library: Biblioteca;
      token: string;
    };

    this.usuarioLogado = library;
  }
}
