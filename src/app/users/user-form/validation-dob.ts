import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const validationDob: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  let dob = group.value;
  let isValid = true;
  let date = new Date(dob);
  if (date.getFullYear() < 1900 || date.getFullYear() > 2022) {
    isValid = false;
  }
  return isValid ? null : {invalidDate: true};
}
