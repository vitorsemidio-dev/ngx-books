import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BibliotecasRoutingModule } from './bibliotecas-routing.module';
import { BibliotecasComponent } from './bibliotecas.component';
import { CardItemComponent } from './card-item/card-item.component';
import { BibliotecaDetalheComponent } from './biblioteca-detalhe/biblioteca-detalhe.component';


@NgModule({
  declarations: [BibliotecasComponent, CardItemComponent, BibliotecaDetalheComponent],
  imports: [
    CommonModule,
    BibliotecasRoutingModule
  ]
})
export class BibliotecasModule { }
