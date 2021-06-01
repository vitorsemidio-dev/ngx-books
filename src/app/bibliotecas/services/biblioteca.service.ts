import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Biblioteca } from '../biblioteca.model';
import { Livro } from '../../livros/livro.model';
import { CrudService } from '../../shared/services/crud.service';
import { Chave } from 'src/app/shared/chave';

interface IAluguelLivro {
  userId: string;
  bookId: string;
  libraryId: string;
}

@Injectable({
  providedIn: 'root',
})
export class BibliotecaService extends CrudService<Biblioteca> {
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

  alugarLivro(infoAlugar: IAluguelLivro) {
    const {
      bookId: book_id,
      libraryId: library_id,
      userId: user_id,
    } = infoAlugar;

    return this.http.post(`${this.apiUrl}/${this.recurso}/rent`, {
      book_id,
      library_id,
      user_id,
    });
  }

  // TODO: Passar token
  adicionarLivroAoCatalogo({ name, pages, quantity, author }: Livro) {
    const book = { name, pages, author };
    const library_id = this.getLibraryId();
    return this.http.post(`${this.apiUrl}/${this.recurso}/register-book`, {
      library_id,
      book,
      quantity,
    });
  }

  // TODO: Refatorar para conseguir de maneira melhor e passar por HEADERS
  private getLibraryId() {
    const dadosLocalStorage = JSON.parse(
      localStorage.getItem(Chave.chaveSessao),
    ) as {
      library: Biblioteca;
    };

    if (!dadosLocalStorage) {
      return null;
    }

    const library_id = dadosLocalStorage.library.id;

    return library_id;
  }
}
