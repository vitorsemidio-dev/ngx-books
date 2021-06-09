import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerta-modal',
  templateUrl: './alerta-modal.component.html',
  styleUrls: ['./alerta-modal.component.scss'],
})
export class AlertaModalComponent implements OnInit {
  @Input() mensagem: string;
  @Input() type = 'success';

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {}

  onClose() {
    this.bsModalRef.hide();
  }
}
