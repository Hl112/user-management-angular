import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UsersComponent} from "./users.component";
import {UserListComponent} from "./user-list/user-list.component";

export const usersRoutes: Routes = [
  {
    path: '', component: UsersComponent,
    children: [
      { path: '' , component: UserListComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(usersRoutes)
  ],
  exports: [RouterModule]
})
export class UsersRoutingModule {

}
