import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Livro } from 'src/app/livros/livro.model';
import { LivrosService } from 'src/app/livros/livros.service';

@Component({
  selector: 'app-livro-detalhe',
  templateUrl: './livro-detalhe.component.html',
  styleUrls: ['./livro-detalhe.component.scss'],
})
export class LivroDetalheComponent implements OnInit {
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
    this.livrosService.buscarPorSlug(this.slug).subscribe((response) => {
      this.livro = response;
    });
  }

  onExcluir() {
    this.confirmacao();
    this.livrosService.remover(this.livro.id).subscribe(
      (response) => {},
      (error) => {},
    );
  }

  private confirmacao() {
    console.log('Deseja realmente excluir?');
  }
}
