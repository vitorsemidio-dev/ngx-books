import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside-item',
  templateUrl: './aside-item.component.html',
  styleUrls: ['./aside-item.component.scss'],
})
export class AsideItemComponent implements OnInit {
  @Input() imgUrl: string;
  @Input() imgAltTexto: string;
  @Input() texto: string;
  @Input() url: string = '/';
  @Input() linkTexto: string = 'Clique aqui';

  constructor() {}

  ngOnInit(): void {}
}
