import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent implements OnInit {
  @Input() imgUrl: string;
  @Input() titulo: string;
  @Input() subtitulo: string;
  @Input() slug: string;

  @Input() textoBotao = 'Clique aqui';
  @Input() tipoBotaoCta: 'Link' | 'Botao' = 'Link';

  @Output() onClickCta = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  emitirOnClickCta() {
    this.onClickCta.emit(this.slug);
  }
}
