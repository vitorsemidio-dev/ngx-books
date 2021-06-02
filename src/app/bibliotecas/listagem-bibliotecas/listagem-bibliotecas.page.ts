import { BibliotecaService } from 'src/app/bibliotecas/services/biblioteca.service';
import { Component, OnInit } from '@angular/core';
import { Biblioteca } from '../biblioteca.model';

@Component({
  selector: 'app-listagem-bibliotecas',
  templateUrl: './listagem-bibliotecas.page.html',
  styleUrls: ['./listagem-bibliotecas.page.scss'],
})
export class ListagemBibliotecasPage implements OnInit {
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
