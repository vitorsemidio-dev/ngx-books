import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BibliotecaAuthGuard } from '../bibliotecas/guards/biblioteca-auth.guard';

import { LivroResolver } from './guards/livro.resolver';
import { LivroDetalheComponent } from './livro-detalhe/livro-detalhe.component';
import { LivroFormularioComponent } from './livro-formulario/livro-formulario.component';

const routes: Routes = [
  {
    path: 'criar-livro',
    component: LivroFormularioComponent,
    canActivate: [BibliotecaAuthGuard],
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
    canActivate: [BibliotecaAuthGuard],
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
