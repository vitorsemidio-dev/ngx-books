import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { AlertaModalComponent } from '../alerta-modal/alerta-modal.component';
import { ConfirmacaoModalComponent } from '../confirmacao-modal/confirmacao-modal.component';

export enum AlertaTipos {
  DANGER = 'danger',
  SUCCESS = 'success',
  INFO = 'info',
  PRIMARY = 'primary',
  WARNING = 'warning',
  SECONDARY = 'secondary',
  LIGHT = 'light',
  DARK = 'dark',
}

@Injectable({
  providedIn: 'root',
})
export class AlertaModalService {
  constructor(private modalService: BsModalService) {}

  private mostrarAlerta(
    mensagem: string,
    type: AlertaTipos,
    dismissTimeout?: number,
  ) {
    const bsModalRef = this.modalService.show(AlertaModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.mensagem = mensagem;

    if (dismissTimeout) {
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }
  }

  mostrarAlertaSucesso(mensagem: string, dismissTimeout = 3000) {
    this.mostrarAlerta(mensagem, AlertaTipos.SUCCESS, dismissTimeout);
  }

  mostrarAlertaAviso(mensagem: string, dismissTimeout?: number) {
    this.mostrarAlerta(mensagem, AlertaTipos.WARNING, dismissTimeout);
  }

  mostrarAlertaError(mensagem: string, dismissTimeout?: number) {
    this.mostrarAlerta(mensagem, AlertaTipos.DANGER, dismissTimeout);
  }

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
