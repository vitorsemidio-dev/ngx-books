import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BibliotecasRoutingModule } from './bibliotecas-routing.module';
import { BibliotecasComponent } from './bibliotecas.component';


@NgModule({
  declarations: [BibliotecasComponent],
  imports: [
    CommonModule,
    BibliotecasRoutingModule
  ]
})
export class BibliotecasModule { }
