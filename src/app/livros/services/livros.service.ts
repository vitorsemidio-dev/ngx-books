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
}

@Injectable({
  providedIn: 'root',
})
export class LivrosService extends CrudService<Livro> {
  acaoLivro: Subject<AcaoLivro> = new Subject();

  constructor(protected http: HttpClient) {
    super(http, 'books');
  }

  remover(livroId: string) {
    return super
      .remover(livroId)
      .pipe(tap(() => this.acaoLivro.next(AcaoLivro.Removido)));
  }

  atualizar(livro: Livro) {
    return super
      .atualizar(livro)
      .pipe(tap(() => this.acaoLivro.next(AcaoLivro.Atualizado)));
  }

  buscarPorSlug(slug: string) {
    return this.http.get<Livro>(`${this.apiUrl}/${this.recurso}/${slug}`);
  }

  private emitirAcao(acao: AcaoLivro) {
    this.acaoLivro.next(acao);
  }
}
