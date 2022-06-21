import { Component, OnInit } from '@angular/core';
import {User} from "../shared/user";
import {UserInPosition} from "./user-in-position";

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

  constructor() { }

  ngOnInit(): void {
  }

  sortBy = 'createDate';
  sortOrder : string = 'ASC';
  searchValue : string = '';
  checkOrder! : boolean;

  users? : User[];
  userInPosition? : UserInPosition[];

}
