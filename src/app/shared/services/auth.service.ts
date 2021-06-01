import { Injectable } from '@angular/core';

import { Biblioteca } from 'src/app/bibliotecas/biblioteca.model';
import { Chave } from '../chave';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  buscarInformacaoUsuarioLogado() {
    const dadosLocalStorage = localStorage.getItem(Chave.chaveUsuarioLogado);

    if (!dadosLocalStorage) {
      return null;
    }

    const { library, token } = JSON.parse(dadosLocalStorage) as {
      library: Biblioteca;
      token: string;
    };

    return {
      library,
      token,
    };
  }
}
