import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

import { BibliotecaService } from '../services/biblioteca.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  formulario: FormGroup;

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
        'nome inicial',
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
    // this.bibliotecaService.criar(this.formulario.value).subscribe(
    //   (response) => {
    //     this.redirecionarRota('/login');
    //   },
    //   (error) => {},
    // );
    // setTimeout(() => this.verificarValidacoesFormulario(), 2000);

    if (this.formulario.valid) {
      console.log('Cadastro realizado com sucesso');
    } else {
      console.log('Falha ao realizar cadastro');
    }
  }

  validacaoVerificarDisponibilidadeNome(formControl: FormControl) {
    if (!formControl) {
      return null;
    }

    return this.bibliotecaService
      .verificarNomeDisponivel(formControl.value)
      .pipe(
        map((response) => {
          return null;
        }),
        catchError((error) => {
          return of({
            nomeJaCadastrado: true,
          });
        }),
      );
  }

  validacaoVerificarDisponibilidadeEmail(formControl: FormControl) {
    if (!formControl) {
      return null;
    }

    return this.bibliotecaService
      .verificarEmailDisponivel(formControl.value)
      .pipe(
        map((response) => {
          return null;
        }),
        catchError((error) => {
          return of({
            emailJaCadastrado: true,
          });
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
