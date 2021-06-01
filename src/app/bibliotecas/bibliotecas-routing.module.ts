import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BibliotecaDetalheComponent } from './biblioteca-detalhe/biblioteca-detalhe.component';
import { BibliotecasComponent } from './bibliotecas.component';
// import { LivroResolver } from './guards/livro.resolver';
// import { LivroDetalheComponent } from '../livros/livro-detalhe/livro-detalhe.component';
// import { LivroFormularioComponent } from '../livros/livro-formulario/livro-formulario.component';
import { PerfilDetalheComponent } from './perfil-detalhe/perfil-detalhe.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  { path: '', component: BibliotecasComponent },
  {
    path: 'perfil',
    component: PerfilComponent,
    children: [
      {
        path: '',
        component: PerfilDetalheComponent,
        // Livros
        // loadChildren: () =>
        //   import('../livros/livros.module').then((m) => m.LivrosModule),
      },
      {
        path: '',
        // Livros
        loadChildren: () =>
          import('../livros/livros.module').then((m) => m.LivrosModule),
      },
      // {
      //   path: 'criar-livro',
      //   component: LivroFormularioComponent,
      //   resolve: {
      //     livro: LivroResolver,
      //   },
      // },
      // {
      //   path: ':slug',
      //   component: LivroDetalheComponent,
      // },
      // {
      //   path: ':slug/editar',
      //   component: LivroFormularioComponent,
      //   resolve: {
      //     livro: LivroResolver,
      //   },
      // },
    ],
  },
  // { path: 'perfil/:slug', component: LivroDetalheComponent },
  { path: ':slug', component: BibliotecaDetalheComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BibliotecasRoutingModule {}
