import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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
    return this.http.patch<Biblioteca>(
      `${this.apiUrl}/${this.recurso}/${library_id}`,
      formData,
    );
  }
}
