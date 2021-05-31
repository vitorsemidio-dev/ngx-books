import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CrudService } from '../shared/services/crud.service';

import { Livro } from './livro.model';

@Injectable({
  providedIn: 'root',
})
export class LivrosService extends CrudService<Livro> {
  constructor(protected http: HttpClient) {
    super(http, 'books');
  }

  buscarPorSlug(slug: string) {
    return this.http.get<Livro>(`${this.apiUrl}/${this.recurso}/${slug}`);
  }
}
