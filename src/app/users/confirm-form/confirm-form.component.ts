import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {DialogConfirm} from "../shared/dialog-confirm";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {deleteUser} from "../store/users.actions";

@Component({
  selector: 'app-confirm-form',
  templateUrl: './confirm-form.component.html',
  styleUrls: ['./confirm-form.component.css']
})
export class ConfirmFormComponent implements OnInit {

  get email() {
    return this.confirmForm.get('email');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteUser(){
    this.store.dispatch(deleteUser({email: this.data.email}));
    this.onNoClick();
  }

  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<ConfirmFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogConfirm,
  ) { }

  ngOnInit(): void {
    this.confirmForm = new FormGroup({
      email: new FormControl('', [Validators.required])
    }, {validators : this.matchEmail});
  }

  confirmForm!: FormGroup;

  matchEmail: ValidatorFn = (group: AbstractControl) : ValidationErrors | null =>{
    let email = group.get('email')?.value;
    return email == this.data.email ? null : {notSame : true};
  }
}
