import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-perfil-detalhe-item',
  templateUrl: './perfil-detalhe-item.component.html',
  styleUrls: ['./perfil-detalhe-item.component.scss'],
})
export class PerfilDetalheItemComponent implements OnInit {
  @Input() imgUrl: string;
  @Input() imgDescricao: string;
  @Input() name: string;
  @Input() email: string;

  @Output() onSair = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  handleSair() {
    this.onSair.emit();
  }
}
