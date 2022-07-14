import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../shared/dialog-data";
import {User} from "../shared/user";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {DatePipe} from "@angular/common";
import {ConfirmFormComponent} from "../confirm-form/confirm-form.component";
import {validationEmail} from "./validation-email";
import {validationDob} from "./validation-dob";
import {HttpStatusCode} from "@angular/common/http";
import {UniqueEmailValidator} from "./UniqueEmailValidator";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  user?: User;
  users!: User[];
  users$!: Observable<User[]>;
  dateTime? = '06-17-2022';
  userForm!: FormGroup;
  isEdit: boolean = false;
  validEmailUni = false;
  public titles = this.userService.titles;

  constructor(
    private us: UserService,
    private store: Store,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserFormComponent>,
    private userService: UserService,
    private uniqueEmailValidator: UniqueEmailValidator,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

  ngOnInit(): void {
    this.user = this.data.user;
    this.isEdit = this.data.isCreate;
    //--Load title
    this.titles = this.userService.titles;
    //--Load custom date to form
    if (this.user !== undefined && this.user !== null) {
      this.onChangeDate(this.user.date_of_birth!);
    }
    this.userForm = new FormGroup({
      // image: new FormControl(''),
      first_name: new FormControl(this.user ? this.user.first_name : '', [Validators.required, Validators.maxLength(80)]),
      last_name: new FormControl(this.user ? this.user.last_name : '', [Validators.required, Validators.maxLength(80)]),
      date_of_birth: new FormControl(this.user ? this.user.date_of_birth : '2022-06-17', [validationDob]),
      gender: new FormControl(this.user ? this.user.gender : 'Female'),
      company: new FormControl('ROSEN'),
      position_id: new FormControl(this.user ? this.user.position_id : this.titles[0].id, [Validators.required]),
      email: new FormControl(this.user ? this.user.email : '', [Validators.required, validationEmail], this.user ? [] : [this.uniqueEmailValidator.validate.bind(this.uniqueEmailValidator)])
    })
  }

  onChangeDate(value: string) {
    let x = new Date(value);
    let pipe = new DatePipe('en-US');
    this.dateTime = pipe.transform(x, 'MM-dd-YYYY') ?? '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCreateUser() {
    let createUser: User = {
      id: this.user?.id,
      ...this.userForm.value,
      createDate: Date.now().toLocaleString()
    };
    this.userService.createUser(createUser).subscribe(response => {
      if(response.status == HttpStatusCode.Created){
        console.log("Create Success")
        this.dialogRef.close(true);
      } else{
        this.dialogRef.close(false);
        console.log('Fail')
      }
    })
  }

  onUpdateUser() {
    let userData: User = {
      id: this.user?.id,
      ...this.userForm.value,
    };
    this.userService.updateUser(userData).subscribe(response => {
      if (response.status == HttpStatusCode.Ok) {
        console.log("Update Success")
        this.dialogRef.close(true);
      } else {
        this.dialogRef.close(false);
        console.log('Fail');
      }
    });

  }

  openConfirmDelete() {
    const dialog = this.dialog.open(ConfirmFormComponent, {
      data: {
        title: "Are you sure you want to DELETE " + this.userForm.value['email'] + "?",
        email: this.userForm.get('email')?.value,
        id: this.user?.id
      },
      width: "500px",
      height: "250px"
    })
    dialog.afterClosed().subscribe(result => {
      this.dialogRef.close(result);
    })
  }

  get firstName() {
    return this.userForm.get('first_name');
  }

  get lastName() {
    return this.userForm.get('last_name');
  }

  get title() {
    return this.userForm.get('position_id');
  }

  get email() {
    return this.userForm.get('email');
  }


}
