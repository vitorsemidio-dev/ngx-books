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

  atualizarImagem(imagem: File, book_id: string) {
    const formData = new FormData();

    formData.append('image', imagem);
    return this.http.patch(
      `${this.apiUrl}/${this.recurso}/${book_id}`,
      formData,
    );
  }
}
