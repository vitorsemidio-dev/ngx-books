import { Component, Input, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}
}
