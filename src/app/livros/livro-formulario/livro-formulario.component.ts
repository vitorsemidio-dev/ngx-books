import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  BibliotecaService,
  AcaoBiblioteca,
} from 'src/app/bibliotecas/services/biblioteca.service';
import { Livro } from 'src/app/livros/livro.model';
import {
  AcaoLivro,
  LivrosService,
} from 'src/app/livros/services/livros.service';

@Component({
  selector: 'app-livro-formulario',
  templateUrl: './livro-formulario.component.html',
  styleUrls: ['./livro-formulario.component.scss'],
})
export class LivroFormularioComponent implements OnInit {
  formularioLivro: FormGroup;
  livro: Livro;
  previewImg: any = 'https://via.placeholder.com/150';

  constructor(
    private bibliotecaService: BibliotecaService,
    private livrosService: LivrosService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((resolve: { livro: Livro }) => {
      this.montarFormulario(resolve.livro);
      this.livro = resolve.livro;
      if (this.livro.imgUrl) {
        this.previewImg = this.livro.imgUrl;
      }
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

  onSubmit() {
    if (this.formularioLivro.valid) {
      console.log('submit');
    } else {
      console.log('formulario invalido');
    }
  }

  onSalvar() {
    if (this.formularioLivro.value['id']) {
      this.atualizarLivro();
    } else {
      this.adicionarLivroAoCatalogo();
    }
  }

  onCancelar() {
    this.router.navigate(['..'], {
      relativeTo: this.activatedRoute,
    });
  }

  private adicionarLivroAoCatalogo() {
    this.bibliotecaService
      .adicionarLivroAoCatalogo(this.formularioLivro.value)
      .subscribe(
        (response) => {
          this.bibliotecaService.emitirAcao(AcaoBiblioteca.Criado);
          this.router.navigate(['/bibliotecas', 'perfil']);
        },
        (error) => {},
      );
  }

  private atualizarLivro() {
    this.livrosService.atualizar(this.formularioLivro.value).subscribe(
      (response) => {
        const { slug } = response;
        this.livrosService.emitirAcao(AcaoLivro.Atualizado);
        this.router.navigate(['/bibliotecas', 'perfil', slug]);
      },
      (error) => {},
    );
  }

  onImagemSelecionada(evento: any) {
    const listaArquivos = <FileList>evento.srcElement.files;
    const imagem = listaArquivos[0];

    this.criarPreviewImagem(imagem);

    if (this.livro.id) {
      this.atualizarImagemLivro(imagem);
    }
  }

  private criarPreviewImagem(imagem: File) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imagem);

    fileReader.onload = (e) => {
      this.previewImg = e.target.result;
    };
  }

  private atualizarImagemLivro(imagem: File) {
    this.livrosService.atualizarImagem(imagem, this.livro.id).subscribe(
      (response) => {},
      (error) => {},
    );
  }
}
