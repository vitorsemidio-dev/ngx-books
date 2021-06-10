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
  private readonly emissorLivro$: Subject<AcaoLivro> = new Subject();

  get emissor() {
    return this.emissorLivro$.asObservable();
  }

  constructor(protected http: HttpClient) {
    super(http, 'books');
  }

  remover(livroId: string) {
    return super
      .remover(livroId)
      .pipe(tap(() => this.emissorLivro$.next(AcaoLivro.Removido)));
  }

  atualizar(livro: Livro) {
    return super
      .atualizar(livro)
      .pipe(tap(() => this.emissorLivro$.next(AcaoLivro.Atualizado)));
  }

  atualizarImagem(imagem: File, id: string) {
    return super
      .atualizarImagem(imagem, id)
      .pipe(tap(() => this.emissorLivro$.next(AcaoLivro.Atualizado)));
  }

  buscarPorSlug(slug: string) {
    return this.http.get<Livro>(`${this.apiUrl}/${this.recurso}/${slug}`);
  }
}
