import { AbstractControl, FormControl } from '@angular/forms';
import { of, timer } from 'rxjs';
import { catchError, mapTo, switchMap } from 'rxjs/operators';
import { CrudService } from './services/crud.service';

export class FormValidations {
  static getErrorMsg(
    fieldName: string,
    validatorName: string,
    validatorValue?: any,
  ) {
    const config = {
      required: `${fieldName} é obrigatório.`,
      minlength: `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
      maxlength: `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
      min: `${fieldName} precisa ter o valor mínimo de ${validatorValue.min}`,
      max: `${fieldName} precisa ter o valor máximo de ${validatorValue.max}`,
      email: `${fieldName} inválido`,
      availability: `${fieldName} já cadastrado.`,
    };

    return config[validatorName];
  }

  static verificarDisponibilidadeCampo(
    nomeCampo: string,
    valorAtual: string,
    service: CrudService<any>,
    debounceTime = 500,
  ) {
    const validator = (controle: AbstractControl | FormControl) => {
      if (!controle) {
        return of(null);
      }

      if (controle.value === valorAtual) {
        return of(null);
      }

      return timer(debounceTime).pipe(
        switchMap(() => {
          return service
            .verificarDisponibilidadeCampo(nomeCampo, controle.value)
            .pipe(
              mapTo(() => null),
              catchError((error) =>
                of({
                  availability: true,
                }),
              ),
            );
        }),
      );
    };

    return validator;
  }
}
