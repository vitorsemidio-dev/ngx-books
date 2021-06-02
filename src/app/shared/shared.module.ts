import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CardItemComponent } from './card-item/card-item.component';
import { AsideItemComponent } from './aside-item/aside-item.component';
import { ImgItemComponent } from './img-item/img-item.component';
import { PerfilDetalheItemComponent } from './perfil-detalhe-item/perfil-detalhe-item.component';
import { ListagemItensComponent } from './listagem-itens/listagem-itens.component';
import { MsgErrorComponent } from './msg-error/msg-error.component';

@NgModule({
  declarations: [
    CardItemComponent,
    AsideItemComponent,
    ImgItemComponent,
    PerfilDetalheItemComponent,
    ListagemItensComponent,
    MsgErrorComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [
    CardItemComponent,
    AsideItemComponent,
    ImgItemComponent,
    PerfilDetalheItemComponent,
    ListagemItensComponent,
    MsgErrorComponent,
  ],
})
export class SharedModule {}
