import { switchMap, mapTo, catchError } from 'rxjs/operators';
import { timer, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  debounceTime = 500;
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
          Validators.maxLength(50),
        ],
        [this.verificarDisponibilidadeCampo('name').bind(this)],
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
    if (this.formularioLivro.valid) {
      this.submit();
    } else {
      this.verificarValidacoesFormulario(this.formularioLivro);
    }
  }

  submit() {
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

  aplicarClasseCssFeedback(nomeCampo: string) {
    const controle = this.formularioLivro.get(nomeCampo);

    if (!controle || controle.status === 'PENDING') {
      return {};
    }

    return {
      'is-valid': (controle.touched || controle.dirty) && controle.valid,
      'is-invalid': (controle.touched || controle.dirty) && !controle.valid,
    };
  }

  verificarDisponibilidadeCampo(nomeCampo: string) {
    const validator = (controle: AbstractControl | FormControl) => {
      if (!controle) {
        return null;
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

  verificarValidacoesFormulario(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach((campo) => {
      const control = formGroup.get(campo);

      this.formularioLivro.get(campo).markAsTouched();
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.verificarValidacoesFormulario(control);
      }
    });
  }
}
