import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './bibliotecas/login/login.component';
import { CadastroComponent } from './bibliotecas/cadastro/cadastro.component';
import { ListagemLivrosPage } from './livros/listagem-livros/listagem-livros.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  {
    path: 'livros',
    component: ListagemLivrosPage,
  },
  {
    path: 'bibliotecas',
    loadChildren: () =>
      import('./bibliotecas/bibliotecas.module').then(
        (m) => m.BibliotecasModule,
      ),
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./usuario/usuario.module').then((m) => m.UsuarioModule),
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
