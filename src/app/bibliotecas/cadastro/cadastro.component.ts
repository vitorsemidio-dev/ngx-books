import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { of, timer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { BibliotecaService } from '../services/biblioteca.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  formulario: FormGroup;
  debounceTime = 500;

  constructor(
    private formBuilder: FormBuilder,
    private bibliotecaService: BibliotecaService,
    private router: Router,
  ) {}

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

  onSubmit() {
    if (this.formulario.valid) {
      this.criarBiblioteca();
    } else {
      this.verificarValidacoesFormulario();
    }
  }

  private criarBiblioteca() {
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
            map(null),
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
            map(null),
            catchError((error) =>
              of({
                emailJaCadastrado: true,
              }),
            ),
          );
      }),
    );
  }

  private verificarValidacoesFormulario() {
    Object.keys(this.formulario.controls).forEach((control) => {
      this.formulario.get(control).markAsTouched();
    });
  }

  private redirecionarRota(rota: string) {
    this.router.navigate([rota]);
  }

  aplicarClasseCssFeedback(nomeCampo: string) {
    const campo = this.formulario.get(nomeCampo);

    if (!campo) {
      return {};
    }

    if (campo.status === 'PENDING') {
      return {};
    }

    return {
      'is-valid': (campo.touched || campo.dirty) && campo.valid,
      'is-invalid': (campo.touched || campo.dirty) && !campo.valid,
    };
  }
}
