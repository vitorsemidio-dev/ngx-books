import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Biblioteca } from './../biblioteca.model';
import { BibliotecaService } from './../../biblioteca.service';
@Component({
  selector: 'app-biblioteca-detalhe',
  templateUrl: './biblioteca-detalhe.component.html',
  styleUrls: ['./biblioteca-detalhe.component.scss'],
})
export class BibliotecaDetalheComponent implements OnInit {
  private slug: string;
  biblioteca: Biblioteca;

  constructor(
    private bibliotecaService: BibliotecaService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.carregarTela();
  }

  carregarTela() {
    this.route.params.subscribe((params) => {
      this.slug = params['slug'];
      console.log(params);
      this.carregarDadosBiblioteca(this.slug);
    });
  }

  carregarDadosBiblioteca(slug: string) {
    this.bibliotecaService.buscarPorSlug(slug).subscribe(
      (response) => console.log(response),
      (error) => {},
    );
  }
}
