import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BibliotecaDetalheComponent } from './biblioteca-detalhe/biblioteca-detalhe.component';
import { BibliotecaFormularioComponent } from './biblioteca-formulario/biblioteca-formulario.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { BibliotecaAuthGuard } from './guards/biblioteca-auth.guard';
import { LoginComponent } from './login/login.component';
import { ListagemBibliotecasPage } from './listagem-bibliotecas/listagem-bibliotecas.page';
import { PerfilDetalheComponent } from './perfil-detalhe/perfil-detalhe.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  { path: '', component: ListagemBibliotecasPage },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [BibliotecaAuthGuard],
    children: [
      {
        path: '',
        component: PerfilDetalheComponent,
      },
      {
        path: 'editar',
        component: BibliotecaFormularioComponent,
      },
      {
        path: '',
        loadChildren: () =>
          import('../livros/livros.module').then((m) => m.LivrosModule),
      },
    ],
  },
  { path: ':slug', component: BibliotecaDetalheComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BibliotecasRoutingModule {}
