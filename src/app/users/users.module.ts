import {NgModule} from "@angular/core";
import { UserListComponent } from './user-list/user-list.component';
import {UsersRoutingModule} from "./users-routing.module";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import { CardUserComponent } from './card-user/card-user.component';


@NgModule({
  imports: [
    UsersRoutingModule,
    FormsModule,
    CommonModule,
    MatButtonModule
  ],
  declarations: [
    UserListComponent,
    CardUserComponent
  ],
  providers: []
})
export class UsersModule {

}
