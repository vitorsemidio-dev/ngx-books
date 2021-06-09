import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BibliotecaService } from 'src/app/bibliotecas/services/biblioteca.service';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { FormValidations } from 'src/app/shared/form-validations';
import { AlertaModalService } from 'src/app/shared/services/alerta-modal.service';
import { RotasUrlApp } from 'src/app/shared/rotas-url-app';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent extends BaseFormComponent implements OnInit {
  rotasUrlApp = RotasUrlApp;

  constructor(
    private formBuilder: FormBuilder,
    private bibliotecaService: BibliotecaService,
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
      name: [
        null,
        [Validators.required],
        [
          FormValidations.verificarDisponibilidadeCampo(
            'name',
            null,
            this.bibliotecaService,
          ),
        ],
      ],
      email: [
        null,
        [Validators.required, Validators.email],
        [
          FormValidations.verificarDisponibilidadeCampo(
            'email',
            null,
            this.bibliotecaService,
          ),
        ],
      ],
      password: [null, [Validators.required]],
    });
  }

  submit() {
    this.bibliotecaService.criar(this.formulario.value).subscribe(
      (response) => {
        this.alertaModalService.mostrarAlertaSucesso(
          'Conta criada com sucesso',
        );
        this.redirecionarRota('/login');
      },
      (error) => {},
    );
  }

  private redirecionarRota(rota: string) {
    this.router.navigate([rota]);
  }
}
