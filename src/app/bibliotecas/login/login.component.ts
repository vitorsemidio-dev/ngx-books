import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth.service';
import { AcaoLogin, LoginService } from 'src/app/shared/services/login.service';

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
    private router: Router,
    private authService: AuthService,
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
        this.authService.salvarDadosSessao(response);
        this.loginService.emitirAutenticacao(AcaoLogin.Login);
        this.redirecionarRota('/bibliotecas/perfil');
      },
      (error) => {},
    );
  }

  private redirecionarRota(rota: string) {
    this.router.navigate([rota]);
  }
}
