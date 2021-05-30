import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class CrudService<T> {
  private apiUrl = environment.baseApiUrl;

  constructor(protected http: HttpClient, private recurso: string) {}

  listar() {
    return this.http.get<T[]>(`${this.apiUrl}/${this.recurso}`);
  }

  buscarPorId(id: string) {
    return this.http.get<T>(`${this.apiUrl}/${this.recurso}/${id}`);
  }

  remover(id: string) {
    return this.http.delete(`${this.apiUrl}/${this.recurso}/${id}`);
  }

  atualizar(entidade: T) {
    return this.http.put(`${this.apiUrl}/${this.recurso}/${entidade['id']}`, {
      entidade,
    });
  }

  criar(entidade: T) {
    return this.http.post(`${this.apiUrl}/${this.recurso}`, {
      entidade,
    });
  }
}
