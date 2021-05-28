import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface Credencial {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly baseUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  fazerLogin({ email, password }: Credencial) {
    return this.http.post(`${this.baseUrl}/libraries/sessions`, {
      email,
      password,
    });
  }
}
