import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Biblioteca } from '../biblioteca.model';

@Component({
  selector: 'app-card-item-biblioteca',
  templateUrl: './card-item-biblioteca.component.html',
  styleUrls: ['./card-item-biblioteca.component.scss'],
})
export class CardItemBibliotecaComponent implements OnInit {
  @Input() biblioteca: Biblioteca;
  @Output() onClickCtaBiblioteca = new EventEmitter<Biblioteca>();

  constructor() {}

  ngOnInit(): void {}

  emitirClickCtaBiblioteca() {
    this.onClickCtaBiblioteca.emit(this.biblioteca);
  }
}
