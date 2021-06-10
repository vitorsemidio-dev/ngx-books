import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { FormValidations } from 'src/app/shared/form-validations';
import { RotasUrlApp } from 'src/app/shared/rotas-url-app';
import { AlertaModalService } from 'src/app/shared/services/alerta-modal.service';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.scss'],
})
export class UsuarioCadastroComponent
  extends BaseFormComponent
  implements OnInit
{
  rotasUrlApp = RotasUrlApp;
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private alertaModalService: AlertaModalService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.montarFormulario();
  }

  private montarFormulario() {
    this.formulario = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [
        null,
        [Validators.required, Validators.email],
        [
          FormValidations.verificarDisponibilidadeCampo(
            'email',
            null,
            this.usuarioService,
          ),
        ],
      ],
      password: [null, [Validators.required]],
    });
  }

  submit() {
    this.usuarioService.criar(this.formulario.value).subscribe(
      (response) => {
        this.alertaModalService.mostrarAlertaSucesso(
          'Conta criada com sucesso',
        );
        this.redirecionarRota('/usuarios/login');
      },
      (error) => {},
    );
  }

  private redirecionarRota(rota: string) {
    this.router.navigate([rota]);
  }
}
