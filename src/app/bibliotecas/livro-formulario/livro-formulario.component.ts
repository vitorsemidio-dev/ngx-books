import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BibliotecaService } from 'src/app/biblioteca.service';
import { Livro } from 'src/app/livros/livro.model';
import { LivrosService } from 'src/app/livros/livros.service';

@Component({
  selector: 'app-livro-formulario',
  templateUrl: './livro-formulario.component.html',
  styleUrls: ['./livro-formulario.component.scss'],
})
export class LivroFormularioComponent implements OnInit {
  formularioLivro: FormGroup;

  constructor(
    private bibliotecaService: BibliotecaService,
    private livrosService: LivrosService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.data.subscribe((resolve: { livro: Livro }) => {
      this.montarFormulario(resolve.livro);
    });
  }

  montarFormulario(dadosIniciais?: Livro) {
    this.formularioLivro = this.fb.group({
      id: [dadosIniciais.id],
      name: [
        dadosIniciais.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      author: [
        dadosIniciais.author,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      pages: [
        dadosIniciais.pages,
        [Validators.required, Validators.min(0), Validators.max(1000)],
      ],
      quantity: [
        dadosIniciais.quantity,
        [Validators.required, Validators.min(0)],
      ],
    });
  }

  onSalvar() {
    if (this.formularioLivro.value['id']) {
      this.atualizarLivro();
      console.log('Atualizar');
    } else {
      console.log('Criar');
      this.adicionarLivroAoCatalogo();
    }
  }

  private adicionarLivroAoCatalogo() {
    this.bibliotecaService
      .adicionarLivroAoCatalogo(this.formularioLivro.value)
      .subscribe(
        (response) => {
          console.log('sucesso');
        },
        (error) => {
          console.log('error');
        },
      );
  }

  private atualizarLivro() {
    this.livrosService.atualizar(this.formularioLivro.value).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log('error');
      },
    );
  }
}
