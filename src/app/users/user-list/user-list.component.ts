import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {User} from "../shared/user";
import {UserInPosition} from "./user-in-position";
import {catchError, debounce, debounceTime, delay, distinctUntilChanged, Observable, of} from "rxjs";
import {Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";
import {UserFormComponent} from "../user-form/user-form.component";
import {UserService} from "../services/user.service";
import {HttpResponse, HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  sortBy: keyof User = 'createDate';
  sortOrder: boolean = false; // default ASC
  searchValue: string = '';

  users!: User[];
  users$?: Observable<HttpResponse<User[]>>;
  userInPosition$?: Observable<UserInPosition[]>;

  @ViewChild('customLoadingTemplate', {static: false})
  customLoadingTemplate!: TemplateRef<any>;
  public loading = true;
  public loadingTemplate!: TemplateRef<any>;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.users$ = this.userService.loadUser(this.sortBy, this.sortOrder, this.searchValue);
    this.users$
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        delay(100)
      )
      .subscribe((response) => {
        if (response.status == HttpStatusCode.Ok)
          this.users = response.body ?? [];
        if (response.status == HttpStatusCode.NoContent)
          this.users = [];
        this.loading = false;
        //-- Apply View
        this.userInPosition$ = this.userService.convertUserGroupByPosition(this.users);
      });
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

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers()
      }
    });
  }
}
