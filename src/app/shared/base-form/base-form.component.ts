import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<div></div>',
})
export abstract class BaseFormComponent implements OnInit {
  formulario: FormGroup;
  constructor() {}

  ngOnInit(): void {}

  abstract submit(): void;

  onSubmit() {
    if (this.formulario.valid) {
      this.submit();
    } else {
      this.verificarValidacoesFormulario(this.formulario);
    }
  }

  verificarValidacoesFormulario(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach((campo) => {
      const control = formGroup.get(campo);

      this.formulario.get(campo).markAsTouched();
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.verificarValidacoesFormulario(control);
      }
    });
  }

  limparCampos() {
    this.formulario.reset();
  }
}
