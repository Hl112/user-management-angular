import {Component, OnInit} from '@angular/core';
import {User} from "../shared/user";
import {UserInPosition} from "./user-in-position";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";
import {UserFormComponent} from "../user-form/user-form.component";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  loadUsers() {
    let users: User[] = this.users;

    //--  Apply Sort
    users = this.userService.sortUser(users, this.sortBy, this.sortOrder);

    //--  Apply Search
    users = this.userService.searchUser(users, this.searchValue);

    //-- Apply View
    this.userInPosition = this.userService.convertUserGroupByPosition(users);
  }

  openDialog(user?: User) {
    this.dialog.open(UserFormComponent, {
      data: {
        title: user ? "UPDATE USER" : "CREATE NEW USER",
        user: user,
        isCreate: !user
      },
      width: "600px",
      height: "600px"
    })
  }

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.users$ = this.userService.loadUser();
    this.users$.subscribe((arrUser) => {
      this.users = arrUser;
      this.loadUsers();
    })

  }

  sortBy: keyof User = 'createDate';
  sortOrder: boolean = false; // default ASC
  searchValue: string = '';

  users!: User[];
  users$?: Observable<User[]>;
  userInPosition?: UserInPosition[];

}
