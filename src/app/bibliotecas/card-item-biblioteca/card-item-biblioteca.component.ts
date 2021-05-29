import { Component, Input, OnInit } from '@angular/core';

import { Biblioteca } from '../biblioteca.model';

@Component({
  selector: 'app-card-item-biblioteca',
  templateUrl: './card-item-biblioteca.component.html',
  styleUrls: ['./card-item-biblioteca.component.scss'],
})
export class CardItemBibliotecaComponent implements OnInit {
  @Input() biblioteca: Biblioteca;

  constructor() {}

  ngOnInit(): void {}
}
