import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Biblioteca } from '../bibliotecas/biblioteca.model';

interface Credencial {
  email: string;
  password: string;
}

interface ILoginResponse {
  token: string;
  library: Biblioteca;
}
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly baseUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  fazerLogin({ email, password }: Credencial) {
    return this.http.post<ILoginResponse>(
      `${this.baseUrl}/libraries/sessions`,
      {
        email,
        password,
      },
    );
  }
}
