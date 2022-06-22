import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {map, Observable} from "rxjs";
import {User} from "../shared/user";
import {selectUsers} from "../store/user.selector";
import {addUser, updateUser} from "../store/users.actions";
import {UserInPosition} from "../user-list/user-in-position";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  users$: Observable<User[]> = this.store.select(selectUsers);
  titles : Array<string> = ["Team lead", "Architecture","Web Developer","Tester","UI/UX","DBA"];

  constructor(
    private store: Store
  ) {
  }

  loadUser(){
    return this.store.select(selectUsers);
  }

  createUser(userData: User) {
    let isExisted = false;
    this.users$
      .pipe(
        map(array => {
          let existed = array.find(user => user.email === userData.email)
          return existed == undefined;
        }),
      )
      .subscribe(result => {
        isExisted = result;
      });

    if (isExisted) {
      this.store.dispatch(addUser({user: userData}));
      return true;
    } else
      return false;

  }

  updateUser(userData: User){
    this.store.dispatch(updateUser({user : userData}));
  }

  // @ts-ignore
  sortUser(arrUser?: User[], sortBy : keyof User, sortOrder: boolean ) {
    let result: User[] = [];

    if (arrUser === undefined || arrUser === null || arrUser.length === 0)
      return result;

    arrUser.forEach(user => {
      result.push(user);
    });
    switch (sortBy) {
      case 'createDate':
        result.sort((userA: User, userB: User) => {
          if (userA.createDate && userB.createDate) {
            if (!sortOrder) {
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
          if (userA[sortBy] && userB[sortBy]) {
            let valueA = userA[sortBy] as string;
            let valueB = userB[sortBy] as string;
            if (!sortOrder) {
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

  // @ts-ignore
  searchUser(arrUser?: User[], searchValue: string) {
    let result: User[] = [];

    if (arrUser === undefined || arrUser === null || arrUser.length === 0)
      return result;

    if (searchValue === '')
      return arrUser;

    arrUser.forEach(user => {
      for (let prop in user) {
        let value = user[prop as keyof User];
        if (prop !== 'createDate' && value !== undefined && value !== null) {
          if ((value as string).toLowerCase().includes(searchValue.toLowerCase())) {
            result.push(user);
            break;
          }
        }
      }
    })
    return result;
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
}
