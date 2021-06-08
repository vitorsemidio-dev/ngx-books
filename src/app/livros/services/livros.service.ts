import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CrudService } from 'src/app/shared/services/crud.service';

import { Livro } from '../livro.model';

export enum AcaoLivro {
  Criado = 'Criado',
  Atualizado = 'Atualizado',
  Removido = 'Removido',
  Devolvido = 'Devolvido',
  Alugado = 'Alugado',
}

@Injectable({
  providedIn: 'root',
})
export class LivrosService extends CrudService<Livro> {
  acaoLivro: Subject<AcaoLivro> = new Subject();

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

  emitirAcao(acao: AcaoLivro) {
    this.acaoLivro.next(acao);
  }

  verificarDisponibilidadeCampo(nomeCampo: string, valor: string) {
    return this.http.post(
      `${this.apiUrl}/${this.recurso}/check-availability/${nomeCampo}`,
      {
        [nomeCampo]: valor,
      },
    );
  }

  devolverLivro(userId: string, bookId: string) {
    return this.http
      .delete(`${this.apiUrl}/users/${userId}/books-rented`, {
        params: {
          book_id: bookId,
        },
      })
      .pipe(tap(() => this.emitirAcao(AcaoLivro.Devolvido)));
  }
}
