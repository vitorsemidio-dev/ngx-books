import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { ConfirmacaoModalComponent } from '../confirmacao-modal/confirmacao-modal.component';

@Injectable({
  providedIn: 'root',
})
export class AlertaModalService {
  constructor(private modalService: BsModalService) {}

  mostrarAlertaConfirmacao(
    titulo: string,
    msg: string,
    btnTxtConfirmar?: string,
    btnTxtCancelar?: string,
  ) {
    const bsModalRef = this.modalService.show(ConfirmacaoModalComponent);

    bsModalRef.content.titulo = titulo;
    bsModalRef.content.msg = msg;

    if (btnTxtConfirmar) {
      bsModalRef.content.btnTxtConfirmar = btnTxtConfirmar;
    }

    if (btnTxtCancelar) {
      bsModalRef.content.btnTxtCancelar = btnTxtCancelar;
    }

    return bsModalRef.content.acaoConfirmacao;
  }
}
