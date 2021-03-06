import {NgModule} from "@angular/core";
import {UserListComponent} from './user-list/user-list.component';
import {UsersRoutingModule} from "./users-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {CardUserComponent} from './card-user/card-user.component';
import {ActionReducerMap, StoreModule} from "@ngrx/store";
import {userReducer} from "./store/user.reducer";
import {MatDialogModule} from "@angular/material/dialog";
import {UserFormComponent} from './user-form/user-form.component';
import {ConfirmFormComponent} from './confirm-form/confirm-form.component';
import {UserService} from "./services/user.service";
import {HttpClientModule} from "@angular/common/http";
import {UniqueEmailValidator} from "./user-form/UniqueEmailValidator";
import {NgxLoadingModule} from "ngx-loading";

export const reducers: ActionReducerMap<any> = {
  users: userReducer
};

@NgModule({
  imports: [
    UsersRoutingModule,
    StoreModule.forRoot(reducers),
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxLoadingModule
  ],
  declarations: [
    UserListComponent,
    CardUserComponent,
    UserFormComponent,
    ConfirmFormComponent
  ],
  providers: [UserService, UniqueEmailValidator]
})
export class UsersModule {

}
