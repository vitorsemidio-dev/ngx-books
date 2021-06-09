import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Chave } from '../shared/chave';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let request: HttpRequest<any> = req;
    const token = this.getToken();

    if (token) {
      request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }

    return next.handle(request);
  }

  private getToken() {
    const dadosSessao = JSON.parse(localStorage.getItem(Chave.chaveSessao)) as {
      token: string;
    };

    if (!dadosSessao) {
      return null;
    }

    return dadosSessao.token;
  }
}
