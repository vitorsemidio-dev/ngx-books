import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from './../login/login.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bibliotecaService: LoginService,
  ) {}

  ngOnInit(): void {
    this.montarFormulario();
  }

  private montarFormulario() {
    this.formulario = this.formBuilder.group({
      name: ['Angular Ngx Books', [Validators.required]],
      email: ['angular@ngxbooks.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
      passwordConfirmation: ['123456', [Validators.required]],
    });
  }

  onSubmit() {
    this.bibliotecaService.fazerLogin(this.formulario.value).subscribe(
      (response) => {
        const nomeChave = '@ngx-books:biblioteca';
        const dadosLoginBiblioteca = JSON.stringify(response);
        localStorage.setItem(nomeChave, dadosLoginBiblioteca);
      },
      (error) => {},
    );
  }
}
