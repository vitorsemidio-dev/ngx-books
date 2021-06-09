import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CardItemComponent } from './card-item/card-item.component';
import { AsideItemComponent } from './aside-item/aside-item.component';
import { ImgItemComponent } from './img-item/img-item.component';
import { PerfilDetalheItemComponent } from './perfil-detalhe-item/perfil-detalhe-item.component';
import { ListagemItensComponent } from './listagem-itens/listagem-itens.component';
import { MsgErrorComponent } from './msg-error/msg-error.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { ConfirmacaoModalComponent } from './confirmacao-modal/confirmacao-modal.component';

@NgModule({
  declarations: [
    CardItemComponent,
    AsideItemComponent,
    ImgItemComponent,
    PerfilDetalheItemComponent,
    ListagemItensComponent,
    MsgErrorComponent,
    InputFieldComponent,
    ConfirmacaoModalComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    CardItemComponent,
    AsideItemComponent,
    ImgItemComponent,
    PerfilDetalheItemComponent,
    ListagemItensComponent,
    MsgErrorComponent,
    InputFieldComponent,
    ConfirmacaoModalComponent,
  ],
})
export class SharedModule {}
