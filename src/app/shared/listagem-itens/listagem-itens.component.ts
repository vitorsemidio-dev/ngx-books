import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listagem-itens',
  templateUrl: './listagem-itens.component.html',
  styleUrls: ['./listagem-itens.component.scss'],
})
export class ListagemItensComponent implements OnInit {
  @Input() lista: any[];
  @Input() titulo: string;
  imgUrlDefault = 'https://via.placeholder.com/150';

  constructor() {}

  ngOnInit(): void {}
}
