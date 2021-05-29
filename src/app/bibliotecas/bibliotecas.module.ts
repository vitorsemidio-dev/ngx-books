import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BibliotecasRoutingModule } from './bibliotecas-routing.module';
import { BibliotecasComponent } from './bibliotecas.component';
import { BibliotecaDetalheComponent } from './biblioteca-detalhe/biblioteca-detalhe.component';
import { CardItemBibliotecaComponent } from './card-item-biblioteca/card-item-biblioteca.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BibliotecasComponent,
    BibliotecaDetalheComponent,
    CardItemBibliotecaComponent,
  ],
  imports: [CommonModule, BibliotecasRoutingModule, SharedModule],
})
export class BibliotecasModule {}
