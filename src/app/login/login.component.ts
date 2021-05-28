import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.montarFormulario();
  }

  private montarFormulario() {
    this.formulario = this.formBuilder.group({
      email: ['bruen@nextlib.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
    });
  }

  onSubmit() {
    this.loginService.fazerLogin(this.formulario.value).subscribe(
      (response) => {
        const nomeChave = '@ngx-books:biblioteca';
        const dadosLoginBiblioteca = JSON.stringify(response);
        localStorage.setItem(nomeChave, dadosLoginBiblioteca);
      },
      (error) => {},
    );
  }
}
