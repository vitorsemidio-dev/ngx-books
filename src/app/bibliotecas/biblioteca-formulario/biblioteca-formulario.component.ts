import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Biblioteca } from 'src/app/bibliotecas/biblioteca.model';
import { BibliotecaService } from 'src/app/bibliotecas/services/biblioteca.service';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { FormValidations } from 'src/app/shared/form-validations';
import { AlertaModalService } from 'src/app/shared/services/alerta-modal.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-biblioteca-formulario',
  templateUrl: './biblioteca-formulario.component.html',
  styleUrls: ['./biblioteca-formulario.component.scss'],
})
export class BibliotecaFormularioComponent
  extends BaseFormComponent
  implements OnInit
{
  biblioteca: Biblioteca;

  constructor(
    private formBuilder: FormBuilder,
    private bibliotecaService: BibliotecaService,
    private router: Router,
    private authService: AuthService,
    private alertaModalService: AlertaModalService,
  ) {
    super();
  }

  ngOnInit(): void {
    const biblioteca =
      this.authService.buscarDadosBiblioteca() || ({} as Biblioteca);
    this.biblioteca = biblioteca;
    if (this.biblioteca.imgUrl) {
      this.previewImg = this.biblioteca.imgUrl;
    }
    this.montarFormulario(biblioteca);
  }

  private montarFormulario(dadosIniciais: Biblioteca) {
    this.formulario = this.formBuilder.group({
      id: [dadosIniciais.id],
      name: [
        dadosIniciais.name,
        [Validators.required],
        [
          FormValidations.verificarDisponibilidadeCampo(
            'name',
            dadosIniciais.name,
            this.bibliotecaService,
          ),
        ],
      ],
      email: [
        dadosIniciais.email,
        [Validators.required, Validators.email],
        [
          FormValidations.verificarDisponibilidadeCampo(
            'email',
            dadosIniciais.email,
            this.bibliotecaService,
          ),
        ],
      ],
      password: [null, []],
    });
  }

  submit() {
    this.bibliotecaService.atualizar(this.formulario.value).subscribe(
      (response) => {
        this.alertaModalService.mostrarAlertaSucesso(
          'Perfil atualizado com sucesso',
        );
        this.salvarDadosAtualizados(response);
        this.redirecionarRota('/bibliotecas/perfil');
      },
      (error) => {},
    );
  }

  private salvarDadosAtualizados(bibliotecaAtualizada: Biblioteca) {
    const { token } = this.authService.buscarDadosSessao();
    const library = bibliotecaAtualizada;

    this.authService.salvarDadosSessao({
      token,
      library,
    });
  }

  onCancelar() {
    this.router.navigate(['/bibliotecas', 'perfil']);
  }

  private redirecionarRota(rota: string) {
    this.router.navigate([rota]);
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
        (response) => {
          this.salvarDadosAtualizados(response);
        },
        (error) => {},
      );
  }
}
