import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BibliotecaService } from 'src/app/biblioteca.service';
import { Livro } from 'src/app/livros/livro.model';
import { LivrosService } from 'src/app/livros/livros.service';
import { Biblioteca } from '../biblioteca.model';

@Component({
  selector: 'app-perfil-detalhe',
  templateUrl: './perfil-detalhe.component.html',
  styleUrls: ['./perfil-detalhe.component.scss'],
})
export class PerfilDetalheComponent implements OnInit {
  biblioteca: Biblioteca;
  catalogo: Livro[];
  imgUrlDefault = 'https://via.placeholder.com/150';

  constructor(private bibliotecaService: BibliotecaService) {}

  ngOnInit(): void {
    this.carregarTela();
  }

  carregarTela() {
    this.carregarDadosPerfil();
    // this.carregarCatalogo();
  }

  private carregarDadosPerfil() {
    const dadosPerfil = JSON.parse(
      localStorage.getItem('@ngx-books:biblioteca'),
    ) as {
      library: Biblioteca;
    };

    this.biblioteca = dadosPerfil.library;
  }

  // private carregarCatalogo() {
  //   this.bibliotecaService.listarCatalogo(this.biblioteca.id).subscribe(
  //     (response) => (this.catalogo = response),
  //     (error) => {},
  //   );
  // }
}
