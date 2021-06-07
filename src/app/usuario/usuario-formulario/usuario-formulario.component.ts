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

import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-usuario-formulario',
  templateUrl: './usuario-formulario.component.html',
  styleUrls: ['./usuario-formulario.component.scss'],
})
export class UsuarioFormularioComponent
  extends BaseFormComponent
  implements OnInit
{
  debounceTime = 500;
  previewImg: any = 'https://via.placeholder.com/150';
  usuario: Usuario;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private authService: AuthService,
  ) {
    super();
  }

  ngOnInit(): void {
    const biblioteca = this.authService.buscarDadosUsuario() || ({} as Usuario);
    this.usuario = biblioteca;
    if (this.usuario.imgUrl) {
      this.previewImg = this.usuario.imgUrl;
    }
    this.montarFormulario(biblioteca);
  }

  private montarFormulario(dadosIniciais: Usuario) {
    this.formulario = this.formBuilder.group({
      id: [dadosIniciais.id],
      name: [
        dadosIniciais.name,
        [Validators.required],
        [
          this.verificarDisponibilidadeCampo('name', dadosIniciais.name).bind(
            this,
          ),
        ],
      ],
      email: [
        dadosIniciais.email,
        [Validators.required, Validators.email],
        [
          this.verificarDisponibilidadeCampo('email', dadosIniciais.email).bind(
            this,
          ),
        ],
      ],
      password: [null, []],
    });
  }

  submit() {
    this.usuarioService.atualizar(this.formulario.value).subscribe(
      (response) => {
        this.salvarDadosAtualizados(response);
        this.redirecionarRota('/bibliotecas/perfil');
      },
      (error) => {},
    );
  }

  private salvarDadosAtualizados(usuarioAtualizado: Usuario) {
    const { token } = this.authService.buscarDadosSessao();
    const user = usuarioAtualizado;

    this.authService.salvarDadosUsuario({
      token,
      user,
    });
  }

  onCancelar() {
    this.router.navigate(['/usuarios', 'perfil']);
  }

  verificarDisponibilidadeCampo(nomeCampo: string, valorAtual: string) {
    const validator = (controle: AbstractControl | FormControl) => {
      if (!controle) {
        return of(null);
      }

      if (controle.value === valorAtual) {
        return of(null);
      }

      return timer(this.debounceTime).pipe(
        switchMap(() => {
          return this.usuarioService
            .verificarDisponibilidadeCampo(nomeCampo, controle.value)
            .pipe(
              mapTo(() => null),
              catchError((error) =>
                of({
                  emailJaCadastrado: true,
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

  onImagemSelecionada(evento: any) {
    const listaArquivos = <FileList>evento.srcElement.files;
    const imagem = listaArquivos[0];

    this.criarPreviewImagem(imagem);

    if (this.usuario.id) {
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
    this.usuarioService.atualizarImagem(imagem, this.usuario.id).subscribe(
      (response) => {
        this.salvarDadosAtualizados(response);
      },
      (error) => {},
    );
  }
}
