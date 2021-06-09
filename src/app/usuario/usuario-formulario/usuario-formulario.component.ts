import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { FormValidations } from 'src/app/shared/form-validations';
import { AlertaModalService } from 'src/app/shared/services/alerta-modal.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { Usuario } from 'src/app/usuario/usuario.model';

@Component({
  selector: 'app-usuario-formulario',
  templateUrl: './usuario-formulario.component.html',
  styleUrls: ['./usuario-formulario.component.scss'],
})
export class UsuarioFormularioComponent
  extends BaseFormComponent
  implements OnInit
{
  usuario: Usuario;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private authService: AuthService,
    private alertaModalService: AlertaModalService,
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
      name: [dadosIniciais.name, [Validators.required]],
      email: [
        dadosIniciais.email,
        [Validators.required, Validators.email],
        [
          FormValidations.verificarDisponibilidadeCampo(
            'email',
            dadosIniciais.email,
            this.usuarioService,
          ),
        ],
      ],
      password: [null, []],
    });
  }

  submit() {
    this.usuarioService.atualizar(this.formulario.value).subscribe(
      (response) => {
        this.alertaModalService.mostrarAlertaSucesso(
          'Perfil atualizado com sucesso',
        );
        this.salvarDadosAtualizados(response);
        this.redirecionarRota('/usuarios/perfil');
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
        this.alertaModalService.mostrarAlertaSucesso(
          'Imagem do perfil atualizado com sucesso',
        );
        this.salvarDadosAtualizados(response);
      },
      (error) => {},
    );
  }
}
