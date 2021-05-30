import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Livro } from 'src/app/livros/livro.model';
import { LivrosService } from 'src/app/livros/livros.service';

@Component({
  selector: 'app-perfil-detalhe',
  templateUrl: './perfil-detalhe.component.html',
  styleUrls: ['./perfil-detalhe.component.scss'],
})
export class PerfilDetalheComponent implements OnInit {
  imgUrlDefault = 'https://via.placeholder.com/150';
  slug: string;

  livro: Livro;

  constructor(
    private livrosService: LivrosService,
    private router: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.carregarTela();
  }

  carregarTela() {
    this.router.params.subscribe((params) => {
      this.slug = params['slug'];
      this.carregarDadosLivro();
    });
  }

  private carregarDadosLivro() {
    this.livrosService.listar().subscribe((response) => {
      const responseLivro = response.find((item) => item.slug === this.slug);
      this.livro = responseLivro;
    });
  }
}
