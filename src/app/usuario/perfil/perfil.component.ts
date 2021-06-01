import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/login/login.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  usuario: Usuario;
  livrosAlugados = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private loginService: LoginService,
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit(): void {
    this.carregarTela();
  }

  carregarTela() {
    this.carregarDadosPerfil();
    this.carregarLivrosAlugados();
  }

  private carregarDadosPerfil() {
    const dadosSessao = this.authService.buscarDadosSessao();

    if (!dadosSessao) {
      return;
    }

    this.usuario = dadosSessao.user;
  }

  private carregarLivrosAlugados() {
    const dadosSessao = this.authService.buscarDadosSessao();

    if (!dadosSessao) {
      return;
    }

    const { user } = dadosSessao;
    this.usuarioService.listarLivrosAlugados(user.id).subscribe(
      (response) => {
        console.log(response);
        this.livrosAlugados = response;
      },
      (error) => {
        console.log('Falha ao carregar listagem de livros alugados');
      },
    );
  }

  onSair() {
    this.loginService.fazerLogout();
    this.redirecionarRota('/login');
  }

  private redirecionarRota(rota: string) {
    this.router.navigate([rota]);
  }
}
