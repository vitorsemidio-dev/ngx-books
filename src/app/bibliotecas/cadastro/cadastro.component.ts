import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, timer } from 'rxjs';
import { catchError, mapTo, switchMap } from 'rxjs/operators';

import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { BibliotecaService } from '../services/biblioteca.service';

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
        [this.validacaoVerificarDisponibilidadeNome.bind(this)],
      ],
      email: [
        null,
        [Validators.required, Validators.email],
        [this.validacaoVerificarDisponibilidadeEmail.bind(this)],
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

  validacaoVerificarDisponibilidadeNome(formControl: FormControl) {
    if (!formControl) {
      return null;
    }

    return timer(this.debounceTime).pipe(
      switchMap(() => {
        return this.bibliotecaService
          .verificarNomeDisponivel(formControl.value)
          .pipe(
            mapTo(null),
            catchError((error) =>
              of({
                nomeJaCadastrado: true,
              }),
            ),
          );
      }),
    );
  }

  validacaoVerificarDisponibilidadeEmail(formControl: FormControl) {
    if (!formControl) {
      return null;
    }

    return timer(this.debounceTime).pipe(
      switchMap(() => {
        return this.bibliotecaService
          .verificarEmailDisponivel(formControl.value)
          .pipe(
            mapTo(null),
            catchError((error) =>
              of({
                emailJaCadastrado: true,
              }),
            ),
          );
      }),
    );
  }

  private redirecionarRota(rota: string) {
    this.router.navigate([rota]);
  }
}
