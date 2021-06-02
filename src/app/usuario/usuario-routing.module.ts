import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivroDetalheComponent } from '../livros/livro-detalhe/livro-detalhe.component';

import { LoginComponent } from './login/login.component';
import { PerfilDetalheComponent } from './perfil-detalhe/perfil-detalhe.component';
import { PerfilPage } from './perfil/perfil.page';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'perfil',
    component: PerfilPage,
    children: [
      {
        path: '',
        component: PerfilDetalheComponent,
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
