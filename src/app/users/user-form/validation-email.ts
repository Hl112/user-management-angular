import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const validationEmail: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  let email = group.value;
  let hasError = false;
  let errorObj = {
    validEmail: true
  };
  if (!String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
    hasError = true;
    errorObj.validEmail = false;
  }
  return !hasError ? null : {invalidEmail: true};
}
