import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CrudService } from 'src/app/shared/services/crud.service';
import { Usuario } from '../usuario.model';
import { Livro } from '../../livros/livro.model';

export enum AcaoUsuario {
  LivroAlugado = 'LivroAlugado',
  LivroDevolvido = 'LivroDevolvido',
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends CrudService<Usuario> {
  acaoUsuario: Subject<AcaoUsuario> = new Subject();
  constructor(protected http: HttpClient) {
    super(http, 'users');
  }

  listarLivrosAlugados(userId: string) {
    return this.http.get<Livro[]>(
      `${this.apiUrl}/${this.recurso}/${userId}/books-rented`,
    );
  }

  devolverLivro(userId: string, bookId: string) {
    return this.http
      .delete(`${this.apiUrl}/${this.recurso}/${userId}/books-rented`, {
        params: {
          book_id: bookId,
        },
      })
      .pipe(tap(() => this.acaoUsuario.next(AcaoUsuario.LivroDevolvido)));
  }

  verificarDisponibilidadeCampo(nomeCampo: string, valor: string) {
    return this.http.post(
      `${this.apiUrl}/${this.recurso}/check-availability/${nomeCampo}`,
      {
        [nomeCampo]: valor,
      },
    );
  }

  atualizarImagem(imagem: File, library_id: string) {
    const formData = new FormData();

    formData.append('image', imagem);
    return this.http.patch<Usuario>(
      `${this.apiUrl}/${this.recurso}/${library_id}`,
      formData,
    );
  }
}
