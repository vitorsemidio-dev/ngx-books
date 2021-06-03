import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { FormValidations } from '../form-validations';

@Component({
  selector: 'app-msg-error',
  templateUrl: './msg-error.component.html',
  styleUrls: ['./msg-error.component.scss'],
})
export class MsgErrorComponent implements OnInit {
  @Input() msgError: string;

  @Input() control: FormControl | AbstractControl;
  @Input() label: string;

  constructor() {}

  ngOnInit(): void {}

  get mensagemErro() {
    if (!this.control) {
      return null;
    }

    for (const propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched
      ) {
        return FormValidations.getErrorMsg(
          this.label,
          propertyName,
          this.control.errors[propertyName],
        );
      }
    }

    return null;
  }
}
