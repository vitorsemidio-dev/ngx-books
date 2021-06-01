import { Component, OnInit } from '@angular/core';

import { BibliotecaService } from 'src/app/bibliotecas/services/biblioteca.service';
import { Livro } from 'src/app/livros/livro.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Biblioteca } from '../biblioteca.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  biblioteca: Biblioteca;
  catalogo: Livro[];

  constructor(
    private bibliotecaService: BibliotecaService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.carregarTela();
  }

  carregarTela() {
    this.carregarDadosPerfil();
    this.carregarCatalogo();
  }

  private carregarDadosPerfil() {
    const dadosSessao = this.authService.buscarDadosSessao();

    if (!dadosSessao) {
      return;
    }

    this.biblioteca = dadosSessao.library;
  }

  private carregarCatalogo() {
    this.bibliotecaService.listarCatalogo(this.biblioteca.id).subscribe(
      (response) => (this.catalogo = response),
      (error) => {},
    );
  }
}
