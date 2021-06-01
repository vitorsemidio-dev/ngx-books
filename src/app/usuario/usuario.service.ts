import { Injectable } from '@angular/core';

import { Usuario } from './usuario';

import { CrudService } from '../shared/services/crud.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends CrudService<Usuario> {
  constructor(protected http: HttpClient) {
    super(http, 'users');
  }

  listarLivrosAlugados(userId: string) {
    return this.http.get(
      `${this.apiUrl}/${this.recurso}/${userId}/books-rented`,
    );
  }
}
