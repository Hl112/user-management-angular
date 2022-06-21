import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersModule} from "./users/users.module";
import {NotFoundComponent} from "./shared/not-found/not-found.component";

const routes: Routes = [
  { path : '', redirectTo: '/users', pathMatch : 'full' },
  { path : 'users', loadChildren: () => UsersModule },
  { path: '**' , component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
