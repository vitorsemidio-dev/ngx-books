import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Biblioteca } from 'src/app/bibliotecas/biblioteca.model';
import { Chave } from 'src/app/shared/chave';
import { Usuario } from 'src/app/usuario/usuario.model';

interface ICredencial {
  email: string;
  password: string;
}

interface ILoginResponse {
  token: string;
  library: Biblioteca;
  user: Usuario;
}

export enum AcaoLogin {
  Login = 'Login',
  Logout = 'Logout',
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly emissorLogin$: Subject<AcaoLogin> = new Subject();

  get emissor() {
    return this.emissorLogin$.asObservable();
  }

  private readonly baseUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  fazerLoginBiblioteca({ email, password }: ICredencial) {
    return this.http.post<ILoginResponse>(
      `${this.baseUrl}/libraries/sessions`,
      {
        email,
        password,
      },
    );
  }

  fazerLoginUsuario({ email, password }: ICredencial) {
    return this.http.post<ILoginResponse>(`${this.baseUrl}/users/sessions`, {
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
    this.emissorLogin$.next(acao);
  }
}
