import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Chave } from 'src/app/shared/chave';
import { Biblioteca } from '../biblioteca.model';
import { Livro } from '../../livros/livro.model';
import { CrudService } from '../../shared/services/crud.service';
import { delay } from 'rxjs/operators';

interface IAluguelLivro {
  userId: string;
  bookId: string;
}

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
  acaoBiblioteca: Subject<AcaoBiblioteca> = new Subject();

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

  emitirAcao(acao: AcaoBiblioteca) {
    this.acaoBiblioteca.next(acao);
  }

  alugarLivro(infoAlugar: IAluguelLivro) {
    const { bookId: book_id, userId: user_id } = infoAlugar;

    return this.http.post(`${this.apiUrl}/${this.recurso}/rent`, {
      book_id,
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

  verificarNomeDisponivel(name: string) {
    return this.http
      .post(`${this.apiUrl}/${this.recurso}/check-available/name`, {
        name,
      })
      .pipe(delay(2000));
  }
}
