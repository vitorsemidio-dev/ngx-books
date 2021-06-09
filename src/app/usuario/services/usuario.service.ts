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
interface IAluguelLivro {
  userId: string;
  bookId: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends CrudService<Usuario> {
  emissorUsuario$: Subject<AcaoUsuario> = new Subject();

  get emissor() {
    return this.emissorUsuario$.asObservable();
  }

  constructor(protected http: HttpClient) {
    super(http, 'users');
  }

  listarLivrosAlugados(userId: string) {
    return this.http.get<Livro[]>(
      `${this.apiUrl}/${this.recurso}/${userId}/books-rented`,
    );
  }

  devolverLivro(infoAluguelLivro: IAluguelLivro) {
    const { bookId: book_id, userId: user_id } = infoAluguelLivro;
    return this.http
      .delete(`${this.apiUrl}/${this.recurso}/${user_id}/books-rented`, {
        params: {
          book_id,
        },
      })
      .pipe(tap(() => this.emissorUsuario$.next(AcaoUsuario.LivroDevolvido)));
  }

  alugarLivro(infoAluguelLivro: IAluguelLivro) {
    const { bookId: book_id, userId: user_id } = infoAluguelLivro;

    return this.http
      .post(`${this.apiUrl}/${this.recurso}/${user_id}/books-rented`, {
        book_id,
      })
      .pipe(tap(() => this.emissorUsuario$.next(AcaoUsuario.LivroAlugado)));
  }
}
