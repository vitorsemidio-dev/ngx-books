import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Livro } from 'src/app/livros/livro.model';
import { LivrosService } from 'src/app/livros/livros.service';

@Injectable({ providedIn: 'root' })
export class LivroResolver implements Resolve<Livro> {
  constructor(private livrosService: LivrosService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Livro> {
    const slug = route.params['slug'];

    if (slug) {
      return this.livrosService.buscarPorSlug(slug);
    }

    return of(new Livro());
  }
}
