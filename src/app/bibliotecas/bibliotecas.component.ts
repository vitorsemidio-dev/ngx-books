import { Component, OnInit } from '@angular/core';

import { Biblioteca } from './biblioteca.model';
import { BibliotecaService } from './services/biblioteca.service';

@Component({
  selector: 'app-bibliotecas',
  templateUrl: './bibliotecas.component.html',
  styleUrls: ['./bibliotecas.component.scss'],
})
export class BibliotecasComponent implements OnInit {
  listagemBibliotecas: Biblioteca[] = [];

  constructor(private bibliotecaService: BibliotecaService) {}

  ngOnInit(): void {
    this.carregarListagem();
  }

  carregarListagem() {
    this.bibliotecaService.listar().subscribe(
      (response) => {
        this.listagemBibliotecas = response;
      },
      (error) => {},
    );
  }
}
