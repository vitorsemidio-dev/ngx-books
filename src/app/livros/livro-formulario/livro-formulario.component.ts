import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { timer, of } from 'rxjs';
import { switchMap, mapTo, catchError } from 'rxjs/operators';

import {
  BibliotecaService,
  AcaoBiblioteca,
} from 'src/app/bibliotecas/services/biblioteca.service';
import { Livro } from 'src/app/livros/livro.model';
import {
  AcaoLivro,
  LivrosService,
} from 'src/app/livros/services/livros.service';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
@Component({
  selector: 'app-livro-formulario',
  templateUrl: './livro-formulario.component.html',
  styleUrls: ['./livro-formulario.component.scss'],
})
export class LivroFormularioComponent
  extends BaseFormComponent
  implements OnInit
{
  debounceTime = 500;
  livro: Livro;
  previewImg: any = 'https://via.placeholder.com/150';

  constructor(
    private bibliotecaService: BibliotecaService,
    private livrosService: LivrosService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    super();
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((resolve: { livro: Livro }) => {
      this.livro = resolve.livro;
      this.montarFormulario(resolve.livro);
      if (this.livro.imgUrl) {
        this.previewImg = this.livro.imgUrl;
      }
    });
  }

  montarFormulario(dadosIniciais: Livro) {
    this.formulario = this.fb.group({
      id: [dadosIniciais.id],
      name: [
        dadosIniciais.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
        [
          this.verificarDisponibilidadeCampo('name', dadosIniciais.name).bind(
            this,
          ),
        ],
      ],
      author: [
        dadosIniciais.author,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      pages: [
        dadosIniciais.pages,
        [Validators.required, Validators.min(0), Validators.max(1000)],
      ],
      quantity: [
        dadosIniciais.quantity,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.submit();
    } else {
      this.verificarValidacoesFormulario(this.formulario);
    }
  }

  submit() {
    if (this.formulario.value['id']) {
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
      .adicionarLivroAoCatalogo(this.formulario.value)
      .subscribe(
        (response) => {
          this.router.navigate(['/bibliotecas', 'perfil']);
        },
        (error) => {},
      );
  }

  private atualizarLivro() {
    this.livrosService.atualizar(this.formulario.value).subscribe(
      (response) => {
        const { slug } = response;
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

  verificarDisponibilidadeCampo(nomeCampo: string, valorAtualCampo?: string) {
    const validator = (controle: AbstractControl | FormControl) => {
      if (!controle) {
        return of(null);
      }

      if (controle.value === valorAtualCampo) {
        return of(null);
      }

      return timer(this.debounceTime).pipe(
        switchMap(() => {
          return this.livrosService
            .verificarDisponibilidadeCampo(nomeCampo, controle.value)
            .pipe(
              mapTo(() => null),
              catchError((error) =>
                of({
                  nomeJaCadastrado: true,
                }),
              ),
            );
        }),
      );
    };

    return validator;
  }
}
