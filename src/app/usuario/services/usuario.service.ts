import { Injectable } from '@angular/core';

import { Usuario } from '../usuario.model';

import { CrudService } from 'src/app/shared/services/crud.service';
import { HttpClient } from '@angular/common/http';
import { Livro } from '../../livros/livro.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends CrudService<Usuario> {
  constructor(protected http: HttpClient) {
    super(http, 'users');
  }

  listarLivrosAlugados(userId: string) {
    return this.http.get<Livro[]>(
      `${this.apiUrl}/${this.recurso}/${userId}/books-rented`,
    );
  }
}
