import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { of, timer } from 'rxjs';
import { catchError, mapTo, switchMap } from 'rxjs/operators';

import { Biblioteca } from 'src/app/bibliotecas/biblioteca.model';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { BibliotecaService } from '../services/biblioteca.service';

@Component({
  selector: 'app-biblioteca-formulario',
  templateUrl: './biblioteca-formulario.component.html',
  styleUrls: ['./biblioteca-formulario.component.scss'],
})
export class BibliotecaFormularioComponent
  extends BaseFormComponent
  implements OnInit
{
  debounceTime = 500;
  previewImg: any = 'https://via.placeholder.com/150';
  biblioteca: Biblioteca;

  constructor(
    private formBuilder: FormBuilder,
    private bibliotecaService: BibliotecaService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.montarFormulario();
  }

  private montarFormulario() {
    this.formulario = this.formBuilder.group({
      name: [
        null,
        [Validators.required],
        [this.verificarDisponibilidadeCampo('name').bind(this)],
      ],
      email: [
        null,
        [Validators.required, Validators.email],
        [this.verificarDisponibilidadeCampo('email').bind(this)],
      ],
      password: [null, [Validators.required]],
    });
  }

  submit() {
    this.bibliotecaService.criar(this.formulario.value).subscribe(
      (response) => {
        this.redirecionarRota('/login');
      },
      (error) => {},
    );
  }

  verificarDisponibilidadeCampo(nomeCampo: string) {
    const validator = (controle: AbstractControl | FormControl) => {
      if (!controle) {
        return null;
      }

      return timer(this.debounceTime).pipe(
        switchMap(() => {
          return this.bibliotecaService
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

  private redirecionarRota(rota: string) {
    this.router.navigate([rota]);
  }

  private atualizarLivro() {
    this.bibliotecaService.atualizar(this.formulario.value).subscribe(
      (response) => {
        const { slug } = response;
        // this.bibliotecaService.emitirAcao(AcaoLivro.Atualizado);
        this.router.navigate(['/bibliotecas', 'perfil', slug]);
      },
      (error) => {},
    );
  }

  onImagemSelecionada(evento: any) {
    const listaArquivos = <FileList>evento.srcElement.files;
    const imagem = listaArquivos[0];

    this.criarPreviewImagem(imagem);

    if (this.biblioteca.id) {
      this.atualizarImagemPerfil(imagem);
    }
  }

  private criarPreviewImagem(imagem: File) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imagem);

    fileReader.onload = (e) => {
      this.previewImg = e.target.result;
    };
  }

  private atualizarImagemPerfil(imagem: File) {
    this.bibliotecaService
      .atualizarImagem(imagem, this.biblioteca.id)
      .subscribe(
        (response) => {},
        (error) => {},
      );
  }
}
