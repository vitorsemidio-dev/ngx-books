import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivroDetalheComponent } from 'src/app/livros/livro-detalhe/livro-detalhe.component';
import { UsuarioAuthGuard } from './guards/usuario-auth.guard';

import { LoginComponent } from './login/login.component';
import { PerfilDetalheComponent } from './perfil-detalhe/perfil-detalhe.component';
import { PerfilPage } from './perfil/perfil.page';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuarioFormularioComponent } from './usuario-formulario/usuario-formulario.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastro',
    component: UsuarioCadastroComponent,
  },
  {
    path: 'perfil',
    component: PerfilPage,
    canActivate: [UsuarioAuthGuard],
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
