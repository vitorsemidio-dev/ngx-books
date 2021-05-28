import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BibliotecasRoutingModule } from './bibliotecas-routing.module';
import { BibliotecasComponent } from './bibliotecas.component';
import { CardItemComponent } from './card-item/card-item.component';


@NgModule({
  declarations: [BibliotecasComponent, CardItemComponent],
  imports: [
    CommonModule,
    BibliotecasRoutingModule
  ]
})
export class BibliotecasModule { }
