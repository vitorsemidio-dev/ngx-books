import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() classeCss: any;
  @Input() id: string;
  @Input() label: string;
  @Input() type = 'text';
  @Input() placeholder: string;
  @Input() control: AbstractControl | FormControl;

  constructor() {}

  registerOnChange() {}

  registerOnTouched() {}

  setDisabledState() {}

  writeValue() {}
}
