import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {DialogConfirm} from "../shared/dialog-confirm";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {deleteUser} from "../store/users.actions";
import {HttpStatusCode} from "@angular/common/http";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-confirm-form',
  templateUrl: './confirm-form.component.html',
  styleUrls: ['./confirm-form.component.css']
})
export class ConfirmFormComponent implements OnInit {

  confirmForm!: FormGroup;

  constructor(
    private store: Store,
    private userService: UserService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ConfirmFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogConfirm,
  ) { }

  ngOnInit(): void {
    this.confirmForm = new FormGroup({
      email: new FormControl('', [Validators.required])
    }, {validators : this.matchEmail});
  }

  get email() {
    return this.confirmForm.get('email');
  }

  onDiscard(){
    this.dialogRef.close(false);
  }

  onDeleteUser(){
    this.userService.deleteUser(this.data.id).subscribe(response => {
      if(response.status == HttpStatusCode.NoContent){
        console.log("Delete Success")
        this.dialogRef.close(true);
      } else{
        this.onDiscard();
        console.log('Delete Error');
      }

    })
  }

  matchEmail: ValidatorFn = (group: AbstractControl) : ValidationErrors | null =>{
    let email = group.get('email')?.value;
    return email == this.data.email ? null : {notSame : true};
  }
}
