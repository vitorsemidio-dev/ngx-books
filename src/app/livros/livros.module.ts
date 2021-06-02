import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LivrosComponent } from './livros.component';
import { CardItemLivroComponent } from './card-item-livro/card-item-livro.component';

import { LivroDetalheComponent } from './livro-detalhe/livro-detalhe.component';
import { LivroFormularioComponent } from './livro-formulario/livro-formulario.component';

import { LivrosRoutingModule } from './livros-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ListagemLivrosPage } from './listagem-livros/listagem-livros.page';

@NgModule({
  declarations: [
    LivrosComponent,
    CardItemLivroComponent,
    LivroDetalheComponent,
    LivroFormularioComponent,
    ListagemLivrosPage,
  ],
  imports: [
    CommonModule,
    LivrosRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    LivrosComponent,
    CardItemLivroComponent,
    LivroDetalheComponent,
    LivroFormularioComponent,
  ],
})
export class LivrosModule {}
