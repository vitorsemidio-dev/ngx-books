import { Injectable } from '@angular/core';

import { Biblioteca } from 'src/app/bibliotecas/biblioteca.model';
import { Chave } from '../chave';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  buscarDadosSessao() {
    const dadosLocalStorage = localStorage.getItem(Chave.chaveSessao);

    if (!dadosLocalStorage) {
      return null;
    }

    const { library, token, user } = JSON.parse(dadosLocalStorage) as {
      library: Biblioteca;
      token: string;
      user: any;
    };

    return {
      library,
      token,
      user,
    };
  }

  salvarDadosSessao(sessao: { token: string; library: Biblioteca }) {
    const nomeChave = Chave.chaveSessao;
    const dadosLoginBiblioteca = JSON.stringify(sessao);
    localStorage.setItem(nomeChave, dadosLoginBiblioteca);
  }
}
