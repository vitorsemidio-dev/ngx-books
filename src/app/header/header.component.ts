import { Component, OnInit } from '@angular/core';

import { Biblioteca } from '../bibliotecas/biblioteca.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  usuarioLogado: Biblioteca;
  imgUrlDefault = 'https://via.placeholder.com/150';

  constructor() {}

  ngOnInit(): void {
    this.carregarDadosUsuarioAutenticado();
  }

  carregarDadosUsuarioAutenticado() {
    const { library } = JSON.parse(
      localStorage.getItem('@ngx-books:biblioteca'),
    ) as {
      library: Biblioteca;
      token: string;
    };

    this.usuarioLogado = library;
  }
}
