import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivrosComponent } from './livros.component';
import { CardItemLivroComponent } from './card-item-livro/card-item-livro.component';

import { LivroDetalheComponent } from './livro-detalhe/livro-detalhe.component';
import { LivroFormularioComponent } from './livro-formulario/livro-formulario.component';

import { LivrosRoutingModule } from './livros-routing.module';

@NgModule({
  declarations: [
    LivrosComponent,
    CardItemLivroComponent,
    LivroDetalheComponent,
    LivroFormularioComponent,
  ],
  imports: [CommonModule, LivrosRoutingModule],
  exports: [
    LivrosComponent,
    CardItemLivroComponent,
    LivroDetalheComponent,
    LivroFormularioComponent,
  ],
})
export class LivrosModule {}
