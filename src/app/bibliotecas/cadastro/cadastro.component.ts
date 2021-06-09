import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BibliotecaService } from 'src/app/bibliotecas/services/biblioteca.service';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { FormValidations } from 'src/app/shared/form-validations';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent extends BaseFormComponent implements OnInit {
  debounceTime = 500;

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
        this.redirecionarRota('/login');
      },
      (error) => {},
    );
  }

  private redirecionarRota(rota: string) {
    this.router.navigate([rota]);
  }
}
