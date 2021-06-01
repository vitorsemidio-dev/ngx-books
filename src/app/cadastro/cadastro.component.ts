import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BibliotecaService } from '../bibliotecas/services/biblioteca.service';

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
      name: ['Angular Ngx Books', [Validators.required]],
      email: ['angular@ngxbooks.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
    });
  }

  onSubmit() {
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
