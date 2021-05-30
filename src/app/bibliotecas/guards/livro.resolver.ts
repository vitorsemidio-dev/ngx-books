import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Livro } from 'src/app/livros/livro.model';
import { LivrosService } from 'src/app/livros/livros.service';

@Injectable({ providedIn: 'root' })
export class LivroResolver implements Resolve<Livro> {
  constructor(private livrosService: LivrosService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Livro> | Livro {
    const slug = route.params['slug'];

    if (slug) {
      // return of(new Livro());
      return new Livro();
      // this.livrosService.listar().subscribe(
      //   (response) => {
      //     const livro = response.find((item) => item.slug === slug);
      //     return of(livro);
      //   },
      //   (error) => {},
      // );
    }

    // return of(new Livro());
    return new Livro();
  }
}
