import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appConfirmEqualValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ConfirmEqualValidatorDirective,
    multi: true
  }]
})
export class ConfirmEqualValidatorDirective implements Validator {
  @Input() appConfirmEqualValidator: string;
  constructor() { }
  validate(c: AbstractControl): ValidationErrors | null {
    const controlToCompair = c.parent.get(this.appConfirmEqualValidator);
    if (controlToCompair && controlToCompair.value !== c.value) {
      return { 'notEqual': true};
    }
    return null;
  }
}
