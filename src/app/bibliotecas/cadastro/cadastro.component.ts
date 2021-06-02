import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [, [Validators.required]],
    });
  }

  onSubmit() {
    // this.bibliotecaService.criar(this.formulario.value).subscribe(
    //   (response) => {
    //     this.redirecionarRota('/login');
    //   },
    //   (error) => {},
    // );
  }

  private redirecionarRota(rota: string) {
    this.router.navigate([rota]);
  }
}
