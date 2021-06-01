import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivrosComponent } from './livros.component';
import { CardItemLivroComponent } from './card-item-livro/card-item-livro.component';

import { LivrosRoutingModule } from './livros-routing.module';

@NgModule({
  declarations: [LivrosComponent, CardItemLivroComponent],
  imports: [CommonModule, LivrosRoutingModule],
  exports: [LivrosComponent, CardItemLivroComponent],
})
export class LivrosModule {}
