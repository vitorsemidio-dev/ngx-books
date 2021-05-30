import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { Livro } from './livro.model';

@Injectable({
  providedIn: 'root',
})
export class LivrosService {
  private readonly apiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Livro[]>(`${this.apiUrl}/books`);
  }

  buscarPorSlug(slug: string) {
    return this.http.get<Livro>(`${this.apiUrl}/books/${slug}`);
  }
}
