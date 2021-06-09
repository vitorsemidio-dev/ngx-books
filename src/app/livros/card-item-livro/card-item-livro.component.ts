import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Livro } from '../livro.model';

@Component({
  selector: 'app-card-item-livro',
  templateUrl: './card-item-livro.component.html',
  styleUrls: ['./card-item-livro.component.scss'],
})
export class CardItemLivroComponent implements OnInit {
  @Input() livro: Livro;
  @Input() esconderBotaoCta = false;
  @Output() onClickCtaLivro = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  emitirClickCtaLivro() {
    this.onClickCtaLivro.emit(this.livro.id);
  }
}
