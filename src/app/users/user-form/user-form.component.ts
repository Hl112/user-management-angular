import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../shared/dialog-data";
import {User} from "../shared/user";
import {Store} from "@ngrx/store";
import {selectUsers} from "../store/user.selector";
import {map, Observable} from "rxjs";
import {DatePipe} from "@angular/common";
import {addUser, updateUser} from "../store/users.actions";
import {ConfirmFormComponent} from "../confirm-form/confirm-form.component";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  onChangeDate(value: string){
    var x = new Date(value);
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
    let isExisted = false;
    this.users$
      .pipe(
        map(array =>{
          let existed = array.find(u => u.email == this.userForm.value.email)
          return existed == undefined;
        }),
      )
      .subscribe(e=>
      {
        isExisted = e;
      });

    if(isExisted){
      this.store.dispatch(addUser({user : createUser }));
      this.dialogRef.close();
    }
  }

  onUpdateUser(){
    let userData : User = {
      ...this.userForm.value,
    };
    console.log(userData)
    this.store.dispatch(updateUser({user : userData}));
    this.dialogRef.close();
  }

  openConfirmDelete(){
    this.dialogRef.close();
    const dialogConfirmRef = this.dialog.open(ConfirmFormComponent, {
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
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.user = this.data.user;
    this.users$ = this.store.select(selectUsers);
    this.users$.subscribe(arrUser => {
      this.users = arrUser;
    })


    this.userForm = new FormGroup({
      image: new FormControl(''),
      firstName: new FormControl(this.user ? this.user.firstName : '', [Validators.required, Validators.maxLength(80)]),
      lastName: new FormControl(this.user ? this.user.lastName : '', [Validators.required, Validators.maxLength(80)]),
      dateOfBirth: new FormControl(this.user ? this.user.dateOfBirth : '2022-06-17', [this.validationDob]),
      gender: new FormControl(this.user ? this.user.gender : 'Female'),
      company: new FormControl('ROSEN'),
      title: new FormControl(this.user ? this.user.title : this.titles[0], [Validators.required]),
      email: new FormControl(this.user ? this.user.email : '',[Validators.required, this.validationEmail, this.validationUniEmail] )
    })
  }
  user? :User;
  users!: User[];
  users$!: Observable<User[]>;
  dateTime : string = '06-17-2022';
  userForm! : FormGroup;
  public titles = ["Team lead", "Architecture","Web Developer","Tester","UI/UX","DBA"];


  validationEmail: ValidatorFn = (group: AbstractControl) : ValidationErrors | null =>{
    let email = group.value;
    let hasError = false;
    let errorObj = {
      validEmail : true
    };
    if(!String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )){
      hasError = true;
      errorObj.validEmail = false;
    }
    return !hasError ? null : { invalidEmail : true};
  }

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

  validationDob: ValidatorFn = (group: AbstractControl) : ValidationErrors | null =>{
    let dob = group.value;
    let isValid = true;
    let date = new Date(dob);
    if(date.getFullYear() < 1900 || date.getFullYear() > 2022){
      isValid = false;
    }
    return isValid ? null : {invalidDate : true};
  }
}
