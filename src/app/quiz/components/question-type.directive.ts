import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function questionTypeValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const allowed = nameRe.test(control.value);
    return allowed ? null : {errorValue: {value: control.value}};
  };
}
