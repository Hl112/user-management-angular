import { Component, OnInit } from '@angular/core';
import {User} from "../shared/user";
import {UserInPosition} from "./user-in-position";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {selectUsers} from "../store/user.selector";
import {MatDialog} from "@angular/material/dialog";
import {newArray} from "@angular/compiler/src/util";
import {UserFormComponent} from "../user-form/user-form.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  loadUsers(){

  }

  onChangeOrder(){

  }

  openCreateDialog(){

  }

  openUpdateDialog(user : User){

  }


  openDialog(user?: User){
    const dialogRef = this.dialog.open(UserFormComponent, {
      data :{
        title: user ? "UPDATE USER" : "CREATE NEW USER",
        user: user,
        isCreate: user
      },
      width: "600px",
      height: "600px"
    })
  }

  convertUserGroupByPosition(arrUser : User[]){
    let data : UserInPosition[] = [
      { name: 'Team lead', children: [] },
      { name: 'Architecture', children: []},
      { name: 'Web Developer', children: []},
      { name: 'Tester', children: []},
      { name: 'UI/UX', children: []},
      { name: 'DBA', children: []},
    ]

    for(let user of arrUser){
      let k = data.find( dt => dt.name == user.title)
      k?.children?.push(user);
    }
    return data;
  }

  constructor(
    private store: Store,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.users$ = this.store.select(selectUsers);
    this.users$.subscribe((arrUser) => {
      this.users = arrUser;
    })
    this.userInPosition = this.convertUserGroupByPosition(this.users);
  }

  sortBy = 'createDate';
  sortOrder : string = 'ASC';
  searchValue : string = '';
  checkOrder! : boolean;

  users! : User[];
  users$? : Observable<User[]>;
  userInPosition? : UserInPosition[];

}
