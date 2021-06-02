import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Biblioteca } from '../biblioteca.model';
import { Chave } from '../../shared/chave';

interface ICredencial {
  email: string;
  password: string;
}

interface ILoginResponse {
  token: string;
  library: Biblioteca;
}

export enum AcaoLogin {
  Login = 'Login',
  Logout = 'Logout',
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  acaoLogin$: Subject<AcaoLogin> = new Subject();

  private readonly baseUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  fazerLogin({ email, password }: ICredencial) {
    return this.http.post<ILoginResponse>(
      `${this.baseUrl}/libraries/sessions`,
      {
        email,
        password,
      },
    );
  }

  fazerLoginUsuario({ email, password }: ICredencial) {
    return this.http.post<ILoginResponse>(`${this.baseUrl}/sessions`, {
      email,
      password,
    });
  }

  fazerLogout() {
    this.limparInformacaoUsuarioLogado();
    this.emitirAutenticacao(AcaoLogin.Logout);
  }

  private limparInformacaoUsuarioLogado() {
    localStorage.removeItem(Chave.chaveSessao);
  }

  emitirAutenticacao(acao: AcaoLogin) {
    this.acaoLogin$.next(acao);
  }
}
