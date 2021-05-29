import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BibliotecaDetalheComponent } from './biblioteca-detalhe/biblioteca-detalhe.component';
import { BibliotecasComponent } from './bibliotecas.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  { path: '', component: BibliotecasComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: ':slug', component: BibliotecaDetalheComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BibliotecasRoutingModule {}
