import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-msg-error',
  templateUrl: './msg-error.component.html',
  styleUrls: ['./msg-error.component.scss'],
})
export class MsgErrorComponent implements OnInit {
  @Input() msgError: string;

  constructor() {}

  ngOnInit(): void {}
}
