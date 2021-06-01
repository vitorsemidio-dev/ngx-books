import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivroResolver } from '../bibliotecas/guards/livro.resolver';
import { LivroDetalheComponent } from './livro-detalhe/livro-detalhe.component';
import { LivroFormularioComponent } from './livro-formulario/livro-formulario.component';

const routes: Routes = [
  {
    path: 'criar-livro',
    component: LivroFormularioComponent,
    resolve: {
      livro: LivroResolver,
    },
  },
  {
    path: ':slug',
    component: LivroDetalheComponent,
  },
  {
    path: ':slug/editar',
    component: LivroFormularioComponent,
    resolve: {
      livro: LivroResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivrosRoutingModule {}
