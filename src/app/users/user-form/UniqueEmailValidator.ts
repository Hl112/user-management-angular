import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {UserService} from "../services/user.service";
import {catchError, debounceTime, distinctUntilChanged, map, Observable, of} from "rxjs";
import {HttpStatusCode} from "@angular/common/http";
import {Injectable} from "@angular/core";
@Injectable()
export class UniqueEmailValidator implements AsyncValidator{
  validEmailUni :boolean = false;
  constructor(private userService: UserService) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.userService.getUserByEmail(control.value)
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        map(response => (response.status == HttpStatusCode.Ok) ?{ isExisted : true } : null),
        catchError(() => of(null)))
  }


}
