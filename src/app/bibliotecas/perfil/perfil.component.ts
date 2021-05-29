import { Component, OnInit } from '@angular/core';

import { Biblioteca } from '../biblioteca.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  biblioteca: Biblioteca;
  imgUrlDefault = 'https://via.placeholder.com/150';

  constructor() {}

  ngOnInit(): void {
    this.carregarTela();
  }

  carregarTela() {
    this.carregarDadosPerfil();
  }

  private carregarDadosPerfil() {
    const dadosPerfil = JSON.parse(
      localStorage.getItem('@ngx-books:biblioteca'),
    ) as {
      library: Biblioteca;
    };

    this.biblioteca = dadosPerfil.library;
  }
}
