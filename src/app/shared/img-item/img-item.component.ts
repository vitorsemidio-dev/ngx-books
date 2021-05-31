import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-img-item',
  templateUrl: './img-item.component.html',
  styleUrls: ['./img-item.component.scss'],
})
export class ImgItemComponent implements OnInit {
  @Input('src') imgUrl: string;
  @Input('alt') imgDescricao: string;
  @Input() imgUrlDefault: string = 'https://via.placeholder.com/150';

  constructor() {}

  ngOnInit(): void {}
}
