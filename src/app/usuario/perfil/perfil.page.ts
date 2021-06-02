import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth.service';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  livrosAlugados = [];

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit(): void {
    this.carregarTela();
  }

  carregarTela() {
    this.carregarLivrosAlugados();
  }
  private carregarLivrosAlugados() {
    const dadosSessao = this.authService.buscarDadosSessao();

    if (!dadosSessao) {
      return;
    }

    const { user } = dadosSessao;
    this.usuarioService.listarLivrosAlugados(user.id).subscribe(
      (response) => {
        this.livrosAlugados = response;
      },
      (error) => {},
    );
  }
}
