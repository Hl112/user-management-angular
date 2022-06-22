import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../shared/dialog-data";
import {User} from "../shared/user";
import {Store} from "@ngrx/store";
import {selectUsers} from "../store/user.selector";
import {Observable} from "rxjs";
import {DatePipe} from "@angular/common";
import {ConfirmFormComponent} from "../confirm-form/confirm-form.component";
import {validationEmail} from "./validation-email.directive";
import {validationDob} from "./validation-dob.directive";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  onChangeDate(value: string){
    let x = new Date(value);
    let pipe = new DatePipe('en-US');
    this.dateTime = pipe.transform(x, 'MM-dd-YYYY') ?? '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCreateUser(){
    let createUser : User = {
      ...this.userForm.value,
      createDate : Date.now()
    };
    let result = this.userService.createUser(createUser);
    if(result) this.dialogRef.close();
  }

  onUpdateUser(){
    let userData : User = {
      ...this.userForm.value,
    };
    this.userService.updateUser(userData);
    this.dialogRef.close();
  }

  openConfirmDelete(){
    this.dialogRef.close();
    this.dialog.open(ConfirmFormComponent, {
      data :{
        title: "Are you sure you want to DELETE " + this.userForm.value['email'] + "?",
        email: this.userForm.get('email')?.value,
      },
      width: "500px",
      height: "250px"
    })
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }
  get dateOfBirth() {
    return this.userForm.get('dataOfBirth');
  }
  get company() {
    return this.userForm.get('company');
  }
  get title() {
    return this.userForm.get('title');
  }
  get email() {
    return this.userForm.get('email');
  }

  get gender(){
    return this.userForm.get('gender');
  }

  constructor(
    private us: UserService,
    private store: Store,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserFormComponent>,
    private userService : UserService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.user = this.data.user;
    this.isEdit = this.data.isCreate;
    this.users$ = this.store.select(selectUsers);
    this.users$.subscribe(arrUser => {
      this.users = arrUser;
    })
    if(this.user !== undefined && this.user !== null){
      this.onChangeDate(this.user.dateOfBirth!);
    }

    this.userForm = new FormGroup({
      image: new FormControl(''),
      firstName: new FormControl(this.user ? this.user.firstName : '', [Validators.required, Validators.maxLength(80)]),
      lastName: new FormControl(this.user ? this.user.lastName : '', [Validators.required, Validators.maxLength(80)]),
      dateOfBirth: new FormControl(this.user ? this.user.dateOfBirth : '2022-06-17', [validationDob]),
      gender: new FormControl(this.user ? this.user.gender : 'Female'),
      company: new FormControl('ROSEN'),
      title: new FormControl(this.user ? this.user.title : this.titles[0], [Validators.required]),
      email: new FormControl(this.user ? this.user.email : '',[Validators.required, validationEmail, this.validationUniEmail] )
    })
  }
  user? :User;
  users!: User[];
  users$!: Observable<User[]>;
  dateTime? = '06-17-2022';
  userForm! : FormGroup;
  isEdit : boolean = false;
  public titles = ["Team lead", "Architecture","Web Developer","Tester","UI/UX","DBA"];



  validationUniEmail: ValidatorFn = (group: AbstractControl) : ValidationErrors | null =>{
    let email = group.value;
    if(!this.data.isCreate){
      return null;
    }
    let isExisted = false;
    let f = this.users.find(u => u.email == email);
    if(f != undefined){
      isExisted = true
    }
    return isExisted ? {isExisted : true} : null;
  }

}
