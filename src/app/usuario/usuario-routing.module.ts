import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivroDetalheComponent } from 'src/app/livros/livro-detalhe/livro-detalhe.component';

import { LoginComponent } from './login/login.component';
import { PerfilDetalheComponent } from './perfil-detalhe/perfil-detalhe.component';
import { PerfilPage } from './perfil/perfil.page';
import { UsuarioFormularioComponent } from './usuario-formulario/usuario-formulario.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'perfil',
    component: PerfilPage,
    canActivate: [],
    children: [
      {
        path: '',
        component: PerfilDetalheComponent,
      },
      {
        path: 'editar',
        component: UsuarioFormularioComponent,
      },
      {
        path: ':slug',
        component: LivroDetalheComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioRoutingModule {}
