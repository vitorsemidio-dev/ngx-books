import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Livro } from 'src/app/livros/livro.model';

@Injectable({ providedIn: 'root' })
export class LivroResolver implements Resolve<Livro> {
  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<Livro> | Promise<Livro> | Livro {
    return;
  }
}
