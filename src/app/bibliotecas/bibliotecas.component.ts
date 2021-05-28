import { Component, OnInit } from '@angular/core';

import { BibliotecaService } from './../biblioteca.service';

@Component({
  selector: 'app-bibliotecas',
  templateUrl: './bibliotecas.component.html',
  styleUrls: ['./bibliotecas.component.scss'],
})
export class BibliotecasComponent implements OnInit {
  listagemBibliotecas: string[] = [
    'Biblioteca 1',
    'Biblioteca 2',
    'Biblioteca 3',
    'Biblioteca 4',
    'Biblioteca 5',
    'Biblioteca 6',
    'Biblioteca 7',
    'Biblioteca 8',
    'Biblioteca 9',
    'Biblioteca 10',
    'Biblioteca 11',
    'Biblioteca 12',
    'Biblioteca 13',
    'Biblioteca 14',
    'Biblioteca 15',
    'Biblioteca 16',
    'Biblioteca 17',
    'Biblioteca 18',
    'Biblioteca 19',
    'Biblioteca 20',
  ];

  constructor(private bibliotecaService: BibliotecaService) {}

  ngOnInit(): void {
    this.carregarListagem();
  }

  carregarListagem() {
    this.bibliotecaService
      .listar()
      .subscribe((response) => console.log(response));
  }
}
