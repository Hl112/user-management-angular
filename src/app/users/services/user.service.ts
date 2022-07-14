import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {map, Observable, of} from "rxjs";
import {User} from "../shared/user";
import {selectUsers} from "../store/user.selector";
import {addUser, updateUser} from "../store/users.actions";
import {UserInPosition} from "../user-list/user-in-position";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Position} from "../shared/position";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUser: string = "https://hl112.tk/api/v1/user"
  apiPosition: string = "https://hl112.tk/api/v1/position"
  // users$: Observable<User[]> = this.store.select(selectUsers);
  users$: Observable<HttpResponse<User[]>>;
  position$: Observable<Position[]>;

  titles: Array<Position> = [];

  constructor(
    private store: Store,
    private http: HttpClient
  ) {
    this.position$ = this.http.get<Position[]>(this.apiPosition);
    this.position$.subscribe(positionArr => {
      this.titles = positionArr;
    });
    this.users$ = this.http.get<User[]>(this.apiUser, {observe : 'response'});
  }

  loadUser(sortColumn: string, sortOrder: boolean, searchValue: string) {
    let url = this.apiUser + `?sortColumn=${sortColumn}&orderBy=${sortOrder ? 'DESC': 'ASC'}`;
    if(searchValue.trim().length != 0) url+= `&searchValue=${searchValue}`;
    this.users$ = this.http.get<User[]>(url, {observe: 'response'});
    return this.users$;
  }

  getUserByEmail(email: string) : Observable<HttpResponse<User>>{
    return this.http.get<User>(`${this.apiUser}/email/${email}`, {observe: 'response'});
  }

  createUser(userData: User) {
    return this.http.post(this.apiUser, userData, {observe : 'response'});
  }

  updateUser(userData: User) {
    return  this.http.put(this.apiUser, userData, { observe: 'response' });
  }

  deleteUser(userId: number){
    return this.http.delete(this.apiUser + `/${userId}`, {observe: 'response'});
  }

  // @ts-ignore
  sortUser(arrUser?: User[], sortBy: keyof User, sortOrder: boolean) {
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
    return this.position$.pipe(
      map((positionArr) => {
        let data: UserInPosition[] = positionArr.map(position => {
               let userInPosition: UserInPosition = {
                 id: position.id,
                 name: position.position_name,
                 children: []
               };
               return userInPosition;
             });

            if(arrUser != null)
             for (let user of arrUser) {
               let k = data.find(dt => dt.id == user.position_id)
               k?.children?.push(user);
             }
             return data;
      })
    );
  }
}
