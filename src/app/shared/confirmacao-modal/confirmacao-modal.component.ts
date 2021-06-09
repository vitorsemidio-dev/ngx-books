import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirmacao-modal',
  templateUrl: './confirmacao-modal.component.html',
  styleUrls: ['./confirmacao-modal.component.scss'],
})
export class ConfirmacaoModalComponent implements OnInit {
  @Input() titulo: string;
  @Input() msg: string;

  @Input() btnTxtConfirmar = 'Confirmar';
  @Input() btnTxtCancelar = 'Cancelar';

  acaoConfirmacao: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    this.acaoConfirmacao = new Subject();
  }

  onCancelar() {
    this.confirmAndClose(false);
  }

  onConfirmar() {
    this.confirmAndClose(true);
  }

  private confirmAndClose(valor: boolean) {
    this.acaoConfirmacao.next(valor);
    this.bsModalRef.hide();
  }
}
