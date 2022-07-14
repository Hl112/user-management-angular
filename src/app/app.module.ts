import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './users/users.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import {ngxLoadingAnimationTypes, NgxLoadingModule} from "ngx-loading";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UsersComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.5)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff',
      fullScreenBackdrop: false,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
