import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BibliotecaDetalheComponent } from './biblioteca-detalhe/biblioteca-detalhe.component';
import { BibliotecasComponent } from './bibliotecas.component';
import { LivroDetalheComponent } from './livro-detalhe/livro-detalhe.component';
import { LivroFormularioComponent } from './livro-formulario/livro-formulario.component';
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
      },
      {
        path: 'criar-livro',
        component: LivroFormularioComponent,
      },
      {
        path: ':slug',
        component: LivroDetalheComponent,
      },
      {
        path: ':slug/editar',
        component: LivroFormularioComponent,
      },
    ],
  },
  { path: 'perfil/:slug', component: LivroDetalheComponent },
  { path: ':slug', component: BibliotecaDetalheComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BibliotecasRoutingModule {}
