import {Component, OnInit} from '@angular/core';
import {User} from "../shared/user";
import {UserInPosition} from "./user-in-position";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {selectUsers} from "../store/user.selector";
import {MatDialog} from "@angular/material/dialog";
import {UserFormComponent} from "../user-form/user-form.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  loadUsers() {
    let users: User[] = this.users;

    //--  Apply Sort
    users = this.sortUser(users);

    //--  Apply Search
    users = this.searchUser(users);

    //-- Apply View
    this.userInPosition = this.convertUserGroupByPosition(users);
  }

  sortUser(arrUser?: User[]) {
    let result: User[] = [];

    if (arrUser === undefined || arrUser === null || arrUser.length === 0)
      return result;

    arrUser.forEach(user => {
      result.push(user);
    });
    switch (this.sortBy) {
      case 'createDate':
        result.sort((userA: User, userB: User) => {
          if (userA.createDate && userB.createDate) {
            if (!this.sortOrder) {
              return userA.createDate - userB.createDate;
            } else {
              return userB.createDate - userA.createDate;
            }
          }
          return 0;
        })
        break;
      default:
        result.sort((userA: User, userB: User) => {
          if (userA[this.sortBy] && userB[this.sortBy]) {
            let valueA = userA[this.sortBy] as string;
            let valueB = userB[this.sortBy] as string;
            if (!this.sortOrder) {
              return valueA.localeCompare(valueB);
            } else {
              return valueB.localeCompare(valueA);
            }
          }
          return 0;
        })
    }
    return result;
  }

  searchUser(arrUser?: User[]) {
    let result: User[] = [];

    if (arrUser === undefined || arrUser === null || arrUser.length === 0)
      return result;

    if (this.searchValue === '')
      return arrUser;

    arrUser.forEach(user => {
      for (let prop in user) {
        let value = user[prop as keyof User];
        if (prop !== 'createDate' && value !== undefined && value !== null) {
          if ((value as string).toLowerCase().includes(this.searchValue.toLowerCase())) {
            result.push(user);
            break;
          }
        }
      }
    })

    return result;
  }

  openDialog(user?: User) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: {
        title: user ? "UPDATE USER" : "CREATE NEW USER",
        user: user,
        isCreate: !user
      },
      width: "600px",
      height: "600px"
    })
  }

  convertUserGroupByPosition(arrUser: User[]) {
    let data: UserInPosition[] = [
      {name: 'Team lead', children: []},
      {name: 'Architecture', children: []},
      {name: 'Web Developer', children: []},
      {name: 'Tester', children: []},
      {name: 'UI/UX', children: []},
      {name: 'DBA', children: []},
    ]

    for (let user of arrUser) {
      let k = data.find(dt => dt.name == user.title)
      k?.children?.push(user);
    }
    return data;
  }

  constructor(
    private store: Store,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.users$ = this.store.select(selectUsers);
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
