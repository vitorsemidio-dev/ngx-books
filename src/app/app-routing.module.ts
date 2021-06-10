import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListagemLivrosPage } from './livros/listagem-livros/listagem-livros.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'livros',
    pathMatch: 'full',
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
    redirectTo: '/livros',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
