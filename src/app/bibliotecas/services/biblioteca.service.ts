import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Chave } from 'src/app/shared/chave';
import { Biblioteca } from '../biblioteca.model';
import { Livro } from '../../livros/livro.model';
import { CrudService } from '../../shared/services/crud.service';

export enum AcaoBiblioteca {
  Criado = 'Criado',
  Atualizado = 'Atualizado',
  Removido = 'Removido',
  LivroAdicionadoAoCatalogo = 'LivroAdicionadoAoCatalogo',
}

@Injectable({
  providedIn: 'root',
})
export class BibliotecaService extends CrudService<Biblioteca> {
  private readonly emissorBiblioteca$: Subject<AcaoBiblioteca> = new Subject();

  get emissor() {
    return this.emissorBiblioteca$.asObservable();
  }

  constructor(protected http: HttpClient) {
    super(http, 'libraries');
  }

  buscarPorSlug(slug: string) {
    return this.http.get<Biblioteca>(`${this.apiUrl}/${this.recurso}/${slug}`);
  }

  listarCatalogo(idBiblioteca: string) {
    return this.http.get<Livro[]>(
      `${this.apiUrl}/${this.recurso}/stock/${idBiblioteca}`,
    );
  }

  adicionarLivroAoCatalogo({ name, pages, quantity, author }: Livro) {
    const book = { name, pages, author };
    return this.http
      .post(`${this.apiUrl}/${this.recurso}/stock`, {
        book,
        quantity,
      })
      .pipe(
        tap(() =>
          this.emissorBiblioteca$.next(
            AcaoBiblioteca.LivroAdicionadoAoCatalogo,
          ),
        ),
      );
  }
}
