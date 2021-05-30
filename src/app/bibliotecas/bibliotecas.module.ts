import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BibliotecasRoutingModule } from './bibliotecas-routing.module';
import { BibliotecasComponent } from './bibliotecas.component';
import { BibliotecaDetalheComponent } from './biblioteca-detalhe/biblioteca-detalhe.component';
import { CardItemBibliotecaComponent } from './card-item-biblioteca/card-item-biblioteca.component';
import { SharedModule } from '../shared/shared.module';
import { PerfilComponent } from './perfil/perfil.component';
import { PerfilDetalheComponent } from './perfil-detalhe/perfil-detalhe.component';
import { LivroDetalheComponent } from './livro-detalhe/livro-detalhe.component';
import { LivroFormularioComponent } from './livro-formulario/livro-formulario.component';

@NgModule({
  declarations: [
    BibliotecasComponent,
    BibliotecaDetalheComponent,
    CardItemBibliotecaComponent,
    PerfilComponent,
    PerfilDetalheComponent,
    LivroDetalheComponent,
    LivroFormularioComponent,
  ],
  imports: [
    CommonModule,
    BibliotecasRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class BibliotecasModule {}
